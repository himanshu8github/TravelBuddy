import { ConfigService } from '@nestjs/config';
export declare class CohereService {
    private readonly configService;
    private groq;
    constructor(configService: ConfigService);
    createItinerary(destination: string, days: string | number, tripType: string, budget: string, startDate?: string): Promise<{
        success: boolean;
        data: any;
    }>;
}
