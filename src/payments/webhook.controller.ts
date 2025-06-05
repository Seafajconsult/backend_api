import {
  Controller,
  Post,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaystackService } from './paystack.service';
import { Public } from '../common';

@ApiTags('Webhooks')
@Controller('webhooks')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(private readonly paystackService: PaystackService) {}

  @Public()
  @Post('paystack')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Handle Paystack webhook events' })
  @ApiResponse({ status: 200, description: 'Webhook processed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid webhook signature or payload' })
  async handlePaystackWebhook(
    @Body() payload: any,
    @Headers('x-paystack-signature') signature: string,
  ) {
    try {
      if (!signature) {
        throw new BadRequestException('Missing webhook signature');
      }

      await this.paystackService.handleWebhook(payload, signature);
      
      this.logger.log('Paystack webhook processed successfully');
      return { message: 'Webhook processed successfully' };
    } catch (error) {
      this.logger.error('Webhook processing failed:', error);
      throw error;
    }
  }

  @Public()
  @Post('test')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Test webhook endpoint' })
  @ApiResponse({ status: 200, description: 'Webhook test successful' })
  async testWebhook() {
    return {
      message: 'Webhook endpoint is working',
      timestamp: new Date().toISOString(),
    };
  }
}
