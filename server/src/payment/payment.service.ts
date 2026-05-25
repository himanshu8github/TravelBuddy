import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    this.stripe = new Stripe(secretKey);
  }

  async createCheckoutSession(plan: string, email: string) {
    if (!plan || !email) {
      throw new BadRequestException('Plan and email are required');
    }

    const formatPlan = (p: string) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
    const normalizedPlan = formatPlan(plan);

    let priceId: string;

    switch (normalizedPlan) {
      case 'Basic':
        priceId = this.configService.get<string>('BASIC_PLAN_PRICE_ID');
        break;
      case 'Pro':
        priceId = this.configService.get<string>('PRO_PLAN_PRICE_ID');
        break;
      case 'Ultimate':
        priceId = this.configService.get<string>('ULTIMATE_PLAN_PRICE_ID');
        break;
      default:
        throw new BadRequestException('Invalid plan selected');
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
        success_url: `${this.configService.get<string>('FRONTEND_URL')}/dashboard?checkout=success`,
        cancel_url: `${this.configService.get<string>('FRONTEND_URL')}/dashboard?checkout=cancel`,
      });

      return { url: session.url };
    } catch (error) {
      console.error('Stripe Error:', error);
      throw new InternalServerErrorException('Failed to create Stripe session');
    }
  }

  async updatePlan(email: string, status: string) {
    return { success: true, message: 'Plan update request processed' };
  }
}
