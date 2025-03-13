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
@WebSocketGateway() // Allow cross-origin for frontend
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    constructor(private readonly ollamaService: OllamaService) { }

    getAccessToken(client: Socket): string | null {
        const accessToken = client.handshake.headers['authorization'] || '';
        return accessToken
    }
    getRefreshToken(client: Socket): string | null {
        const cookies = cookie.parse(client.handshake.headers.cookie || '');
        const refreshToken = cookies['refreshToken'];
        return refreshToken || null;
    }

    handleConnection(client: Socket) {
        const accessToken = this.getAccessToken(client);
        const refreshToken = this.getRefreshToken(client);



        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);
        console.log(`Client connected: ${client.id}`);
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
        const response = await this.ollamaService.queryOllama(transactionPrompt(data.message));

        Logger.log(response);
        // Emit AI response back to the client
        this.server.emit('newMessage', { user: 'Ollama', message: response });
    }
}
