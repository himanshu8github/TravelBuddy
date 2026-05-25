import { Response } from 'express';
import { WebhookService } from './webhook.service';
export declare class WebhookController {
    private readonly webhookService;
    constructor(webhookService: WebhookService);
    handleWebhook(signature: string, req: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
