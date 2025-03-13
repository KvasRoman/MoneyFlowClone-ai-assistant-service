import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { OllamaService } from '../ai-services/ollama/ollama.service';

@Module({
  providers: [ChatGateway, OllamaService],
})
export class ChatModule {}
