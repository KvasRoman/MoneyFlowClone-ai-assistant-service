import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Server, Socket } from 'socket.io';
import * as cookie from 'cookie';
import { DynamicCommand } from "src/command/dynamicCommand";
import { CommandBus } from "@nestjs/cqrs";
import { CommandService } from "src/command/command.service";
@Injectable()
export class ChatService {
  constructor(private readonly commandService: CommandService) {}
    private getAccessToken(client: Socket): string | null {
        const accessToken = client.handshake.headers['authorization'] || '';
        return accessToken
    }
    private getRefreshToken(client: Socket): string | null {
        const cookies = cookie.parse(client.handshake.headers.cookie || '');
        const refreshToken = cookies['refreshToken'];
        return refreshToken || null;
    }
    async executeCommand(command: DynamicCommand){
        return await this.commandService.execute(Object.assign(new DynamicCommand("", {}), command));
    }
    getTokens(client: Socket){
        return {
            accessToken: this.getAccessToken(client),
            refreshToken: this.getRefreshToken(client)
        }
    }

}
