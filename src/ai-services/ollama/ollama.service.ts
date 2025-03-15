import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OllamaService {
  private readonly ollamaBaseUrl = 'http://localhost:11434/api/generate'; // Ollama's local endpoint

  async queryOllama(prompt: string): Promise<any> {
    try {
      const response = await axios.post(this.ollamaBaseUrl, {
        model: 'phi4:latest', // Change to the model you installed in Ollama
        prompt,
        stream: false
      });

      return this.extractJson(response.data.response) || 'Error generating response';
    } catch (error) {
      console.error('Error querying Ollama:', error);
      return 'Error querying AI';
    }
  }
  extractJson(message: string){
    // Remove triple backticks and 'json' label
    const cleanedMessage = message.replace(/```json|```/g, '').trim();
 
    // Parse as JSON
    try {
        return JSON.parse(cleanedMessage);
    } catch (error) {
        console.error("Invalid JSON:", error);
        return null;
    }
  }
}
