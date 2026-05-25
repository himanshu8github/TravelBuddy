import { CohereService } from './cohere.service';
export declare class CohereController {
    private readonly cohereService;
    constructor(cohereService: CohereService);
    createItinerary(body: {
        destination: string;
        days: string | number;
        tripType: string;
        budget: string;
        startDate?: string;
    }): Promise<{
        success: boolean;
        data: any;
    }>;
}
