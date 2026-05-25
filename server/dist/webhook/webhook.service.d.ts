import { ConfigService } from '@nestjs/config';
import { FirebaseService } from '../firebase/firebase.service';
export declare class WebhookService {
    private readonly configService;
    private readonly firebaseService;
    private stripe;
    constructor(configService: ConfigService, firebaseService: FirebaseService);
    handleWebhook(rawBody: Buffer, signature: string): Promise<void>;
}
