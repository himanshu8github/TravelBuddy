"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const firebase_service_1 = require("../firebase/firebase.service");
const stripe_1 = require("stripe");
let WebhookService = class WebhookService {
    constructor(configService, firebaseService) {
        this.configService = configService;
        this.firebaseService = firebaseService;
        const secretKey = this.configService.get('STRIPE_SECRET_KEY');
        this.stripe = new stripe_1.default(secretKey);
    }
    async handleWebhook(rawBody, signature) {
        let event;
        try {
            const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
            event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
        }
        catch (err) {
            console.error(' Webhook signature verification failed:', err.message);
            throw new common_1.BadRequestException(`Webhook Error: ${err.message}`);
        }
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const customerEmail = session.customer_email;
            const priceId = session.metadata?.price_id;
            let plan = 'Free';
            if (priceId === this.configService.get('BASIC_PLAN_PRICE_ID'))
                plan = 'Basic';
            if (priceId === this.configService.get('PRO_PLAN_PRICE_ID'))
                plan = 'Pro';
            if (priceId === this.configService.get('ULTIMATE_PLAN_PRICE_ID'))
                plan = 'Ultimate';
            try {
                const db = this.firebaseService.getDb();
                const userRef = db.collection('users').where('email', '==', customerEmail);
                const snapshot = await userRef.get();
                if (snapshot.empty) {
                    console.log('⚠️ No user found for:', customerEmail);
                }
                else {
                    for (const doc of snapshot.docs) {
                        await doc.ref.update({ plan });
                        console.log(` Updated plan to ${plan} for ${customerEmail}`);
                    }
                }
            }
            catch (err) {
                console.error(' Firestore update error:', err);
                throw new common_1.InternalServerErrorException('Firestore update failed');
            }
        }
    }
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        firebase_service_1.FirebaseService])
], WebhookService);
//# sourceMappingURL=webhook.service.js.map