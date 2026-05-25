import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('api/chat-suggestions')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async getChatSuggestions(@Body() body: { prompt: string }) {
    const { prompt } = body;
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      throw new BadRequestException('Invalid prompt');
    }
    return this.chatService.getChatSuggestions(prompt);
  }
}
