import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OllamaService {
  private readonly ollamaBaseUrl = 'http://localhost:11434/api/generate'; // Ollama's local endpoint

  async queryOllama(prompt: string): Promise<string> {
    try {
      const response = await axios.post(this.ollamaBaseUrl, {
        model: 'phi4:latest', // Change to the model you installed in Ollama
        prompt,
        stream: false
      });

      return response.data.response || 'Error generating response';
    } catch (error) {
      console.error('Error querying Ollama:', error);
      return 'Error querying AI';
    }
  }
}
