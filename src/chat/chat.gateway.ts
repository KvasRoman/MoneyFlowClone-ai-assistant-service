import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OllamaService } from '../ai-services/ollama/ollama.service';
import { transactionPrompt } from 'src/ai-services/prompt';
import * as cookie from 'cookie';
import { Logger } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthService } from 'src/command/services/auth.service';
import { DynamicCommand } from 'src/command/dynamicCommand';
@WebSocketGateway({cors: {origin: "*", credentials: true}, transports: ['websocket']}) // Allow cross-origin for frontend
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {


    @WebSocketServer()
    server: Server;
    constructor(
        private readonly ollamaService: OllamaService,
        private readonly chatService: ChatService,
        private readonly authService: AuthService
    ) {}


    async handleConnection(client: Socket) {
        try{
            client.data.tokens = this.chatService.getTokens(client);

            Logger.log(client.handshake, "client headers");
            console.log('Access Token:', client.data.tokens.accessToken);
            console.log('Refresh Token:', client.data.tokens.refreshToken);
            console.log(`Client connected: ${client.id}`);
            const account = await this.authService.validate(client.data.tokens);
            client.data.account = account;
            Logger.log(account);
        }
        catch(e){
            Logger.error(e, "error");
            client.disconnect();
        }
        
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('sendMessage')
    async handleMessage(
        @MessageBody() data: { user: string; message: string },
        @ConnectedSocket() client: Socket,
    ) {
        console.log(`Received message from ${data.user}: ${data.message}`);

        // Get AI response from Ollama
        const response: DynamicCommand = await this.ollamaService.queryOllama(transactionPrompt(data.message));
        response.payload.transactionDate = new Date();
        response.payload.accountId = client.data.account.id;
        Logger.log(response);
        this.chatService.executeCommand(response);
        // Emit AI response back to the client
        this.server.emit('newMessage', { user: 'Ollama', message: response });
    }
}
