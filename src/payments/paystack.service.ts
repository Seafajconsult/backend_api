import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../utils/email';
import { EncryptionService } from '../utils/encryption';
import { PAYSTACK } from '../config/constants';
import axios from 'axios';

export interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: any;
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      customer_code: string;
      phone: string;
    };
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
    };
  };
}

@Injectable()
export class PaystackService {
  private readonly logger = new Logger(PaystackService.name);
  private readonly baseUrl = PAYSTACK.BASE_URL;
  private readonly secretKey = PAYSTACK.SECRET_KEY;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private emailService: EmailService,
    private encryptionService: EncryptionService,
  ) {}

  /**
   * Initialize a payment transaction
   */
  async initializePayment(
    email: string,
    amount: number,
    type: string,
    userId: string,
    metadata?: any,
  ): Promise<PaystackInitializeResponse> {
    try {
      const reference = this.generateReference();

      // Create payment record in database
      await this.prisma.payment.create({
        data: {
          amount,
          currency: 'NGN',
          status: 'PENDING',
          type,
          reference,
          ...(type === 'service_fee' ? { studentId: userId } : {}),
          ...(type === 'recruitment_fee' ? { employerId: userId } : {}),
          metadata: metadata || {},
        },
      });

      const payload = {
        email,
        amount: amount * 100, // Paystack expects amount in kobo
        reference,
        callback_url: `${this.configService.get('FRONTEND_URL')}/payment/callback`,
        metadata: {
          userId,
          type,
          ...metadata,
        },
      };

      const response = await axios.post(
        `${this.baseUrl}/transaction/initialize`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.data.status) {
        throw new BadRequestException('Failed to initialize payment');
      }

      this.logger.log(`Payment initialized: ${reference}`);
      return response.data;
    } catch (error) {
      this.logger.error('Payment initialization failed:', error);
      throw new BadRequestException('Failed to initialize payment');
    }
  }

  /**
   * Verify a payment transaction
   */
  async verifyPayment(reference: string): Promise<PaystackVerifyResponse> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
          },
        },
      );

      if (!response.data.status) {
        throw new BadRequestException('Payment verification failed');
      }

      // Update payment record in database
      const payment = await this.prisma.payment.findUnique({
        where: { reference },
        include: {
          student: {
            include: { user: true },
          },
          employer: {
            include: { user: true },
          },
        },
      });

      if (!payment) {
        throw new BadRequestException('Payment record not found');
      }

      const verificationData = response.data.data;

      if (verificationData.status === 'success') {
        await this.prisma.payment.update({
          where: { reference },
          data: {
            status: 'COMPLETED',
            paymentDate: new Date(verificationData.paid_at),
            metadata: {
              ...(payment.metadata as object || {}),
              paystack_data: verificationData,
            },
          },
        });

        // Send payment confirmation email
        const user = payment.student?.user || payment.employer?.user;
        if (user) {
          const name = payment.student
            ? `${payment.student.firstName} ${payment.student.lastName}`
            : payment.employer?.companyName || 'User';

          await this.emailService.sendPaymentConfirmationEmail(
            user.email,
            name,
            payment.amount,
            reference,
          );
        }

        this.logger.log(`Payment verified successfully: ${reference}`);
      } else {
        await this.prisma.payment.update({
          where: { reference },
          data: {
            status: 'FAILED',
            metadata: {
              ...(payment.metadata as object || {}),
              paystack_data: verificationData,
            },
          },
        });

        this.logger.warn(`Payment failed: ${reference}`);
      }

      return response.data;
    } catch (error) {
      this.logger.error('Payment verification failed:', error);
      throw new BadRequestException('Payment verification failed');
    }
  }

  /**
   * Handle Paystack webhook
   */
  async handleWebhook(payload: any, signature: string): Promise<void> {
    try {
      // Verify webhook signature
      const isValidSignature = this.encryptionService.verifyHmac(
        JSON.stringify(payload),
        signature,
        PAYSTACK.WEBHOOK_SECRET || '',
      );

      if (!isValidSignature) {
        throw new BadRequestException('Invalid webhook signature');
      }

      const { event, data } = payload;

      switch (event) {
        case 'charge.success':
          await this.handleSuccessfulCharge(data);
          break;
        case 'charge.failed':
          await this.handleFailedCharge(data);
          break;
        default:
          this.logger.log(`Unhandled webhook event: ${event}`);
      }
    } catch (error) {
      this.logger.error('Webhook handling failed:', error);
      throw error;
    }
  }

  /**
   * Get payment history for a user
   */
  async getPaymentHistory(userId: string, userType: 'student' | 'employer') {
    const whereClause = userType === 'student'
      ? { studentId: userId }
      : { employerId: userId };

    return this.prisma.payment.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        type: true,
        reference: true,
        paymentDate: true,
        createdAt: true,
      },
    });
  }

  /**
   * Generate unique payment reference
   */
  private generateReference(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `SEA_${timestamp}_${random}`.toUpperCase();
  }

  /**
   * Handle successful charge webhook
   */
  private async handleSuccessfulCharge(data: any): Promise<void> {
    const { reference } = data;

    const payment = await this.prisma.payment.findUnique({
      where: { reference },
    });

    if (payment && payment.status === 'PENDING') {
      await this.prisma.payment.update({
        where: { reference },
        data: {
          status: 'COMPLETED',
          paymentDate: new Date(data.paid_at),
          metadata: {
            ...(payment.metadata as object || {}),
            webhook_data: data,
          },
        },
      });

      this.logger.log(`Payment completed via webhook: ${reference}`);
    }
  }

  /**
   * Handle failed charge webhook
   */
  private async handleFailedCharge(data: any): Promise<void> {
    const { reference } = data;

    const payment = await this.prisma.payment.findUnique({
      where: { reference },
    });

    if (payment && payment.status === 'PENDING') {
      await this.prisma.payment.update({
        where: { reference },
        data: {
          status: 'FAILED',
          metadata: {
            ...(payment.metadata as object || {}),
            webhook_data: data,
          },
        },
      });

      this.logger.log(`Payment failed via webhook: ${reference}`);
    }
  }
}
