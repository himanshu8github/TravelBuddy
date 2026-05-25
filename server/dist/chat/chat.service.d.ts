import { ConfigService } from '@nestjs/config';
export declare class ChatService {
    private readonly configService;
    private groq;
    constructor(configService: ConfigService);
    getChatSuggestions(prompt: string): Promise<{
        message: string;
        data: {
            destination: any;
        };
        answer: {
            cities: any;
        };
    }>;
}
