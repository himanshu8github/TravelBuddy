import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getChatSuggestions(body: {
        prompt: string;
    }): Promise<{
        message: string;
        data: {
            destination: any;
        };
        answer: {
            cities: any;
        };
    }>;
}
