import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { OllamaService } from '../ai-services/ollama/ollama.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServicesModule } from 'src/command/services/services.module';
import { ChatService } from './chat.service';
import { CommandModule } from 'src/command/command.module';
@Module({
  imports: [
    ServicesModule,
    CommandModule
  ],
  providers: [ChatGateway, OllamaService, ChatService],
})
export class ChatModule {}
