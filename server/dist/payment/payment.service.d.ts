import { ConfigService } from '@nestjs/config';
export declare class PaymentService {
    private readonly configService;
    private stripe;
    constructor(configService: ConfigService);
    createCheckoutSession(plan: string, email: string): Promise<{
        url: string;
    }>;
    updatePlan(email: string, status: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
