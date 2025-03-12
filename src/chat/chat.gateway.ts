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
import { OllamaService } from './ollama.service';

@WebSocketGateway() // Allow cross-origin for frontend
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    constructor(private readonly ollamaService: OllamaService) { }

    handleConnection(client: Socket) {
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
        const response = await this.ollamaService.queryOllama(data.message);

        // Emit AI response back to the client
        this.server.emit('newMessage', { user: 'Ollama', message: response });
    }
}
