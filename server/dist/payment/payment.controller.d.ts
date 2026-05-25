import { PaymentService } from './payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createCheckoutSession(body: {
        plan: string;
        email: string;
    }): Promise<{
        url: string;
    }>;
    updatePlan(body: {
        email: string;
        status: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
