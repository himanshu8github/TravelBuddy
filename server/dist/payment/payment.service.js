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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = require("stripe");
let PaymentService = class PaymentService {
    constructor(configService) {
        this.configService = configService;
        const secretKey = this.configService.get('STRIPE_SECRET_KEY');
        this.stripe = new stripe_1.default(secretKey);
    }
    async createCheckoutSession(plan, email) {
        if (!plan || !email) {
            throw new common_1.BadRequestException('Plan and email are required');
        }
        const formatPlan = (p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
        const normalizedPlan = formatPlan(plan);
        let priceId;
        switch (normalizedPlan) {
            case 'Basic':
                priceId = this.configService.get('BASIC_PLAN_PRICE_ID');
                break;
            case 'Pro':
                priceId = this.configService.get('PRO_PLAN_PRICE_ID');
                break;
            case 'Ultimate':
                priceId = this.configService.get('ULTIMATE_PLAN_PRICE_ID');
                break;
            default:
                throw new common_1.BadRequestException('Invalid plan selected');
        }
        try {
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                customer_email: email,
                success_url: `${this.configService.get('FRONTEND_URL')}/dashboard?checkout=success`,
                cancel_url: `${this.configService.get('FRONTEND_URL')}/dashboard?checkout=cancel`,
            });
            return { url: session.url };
        }
        catch (error) {
            console.error('Stripe Error:', error);
            throw new common_1.InternalServerErrorException('Failed to create Stripe session');
        }
    }
    async updatePlan(email, status) {
        return { success: true, message: 'Plan update request processed' };
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map