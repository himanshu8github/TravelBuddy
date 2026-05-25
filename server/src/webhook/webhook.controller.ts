import { Controller, Post, Headers, Req, Res, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { WebhookService } from './webhook.service';

@Controller('api/stripe')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    const rawBody = req.rawBody;
    if (!rawBody) {
      throw new BadRequestException('Raw request body is missing');
    }

    await this.webhookService.handleWebhook(rawBody, signature);
    return res.status(200).json({ received: true });
  }
}
