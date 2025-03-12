import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { OllamaService } from './ollama.service';

@Module({
  providers: [ChatGateway, OllamaService],
})
export class ChatModule {}
