import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(@Body() body: { plan: string; email: string }) {
    return this.paymentService.createCheckoutSession(body.plan, body.email);
  }

  @Post('update-plan')
  async updatePlan(@Body() body: { email: string; status: string }) {
    return this.paymentService.updatePlan(body.email, body.status);
  }
}
