import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BREVO } from '../config/constants';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {}

  async sendEmail(to: string, subject: string, htmlContent: string, templateId?: number): Promise<void> {
    try {
      // For now, we'll just log the email instead of actually sending it
      // This prevents the Brevo SDK issues during development
      this.logger.log(`📧 Email would be sent to: ${to}`);
      this.logger.log(`📧 Subject: ${subject}`);
      this.logger.log(`📧 Template ID: ${templateId || 'None'}`);

      // In production, you would implement the actual Brevo API call here
      // using fetch or axios instead of the problematic SDK

      return Promise.resolve();
    } catch (error) {
      this.logger.error('Email sending failed:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendVerificationEmail(email: string, otp: string): Promise<void> {
    const subject = 'Email Verification - SEA-FAJ Portal';
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Email Verification</h2>
        <p>Thank you for registering with SEA-FAJ Consult!</p>
        <p>Your verification code is:</p>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #007bff; font-size: 32px; margin: 0;">${otp}</h1>
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #6c757d; font-size: 12px;">
          This is an automated email from SEA-FAJ Consult. Please do not reply.
        </p>
      </div>
    `;

    await this.sendEmail(email, subject, htmlContent, BREVO.TEMPLATES.EMAIL_VERIFICATION);
  }

  async sendPasswordResetEmail(email: string, otp: string): Promise<void> {
    const subject = 'Password Reset - SEA-FAJ Portal';
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc3545;">Password Reset Request</h2>
        <p>We received a request to reset your password.</p>
        <p>Your password reset code is:</p>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #dc3545; font-size: 32px; margin: 0;">${otp}</h1>
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #6c757d; font-size: 12px;">
          This is an automated email from SEA-FAJ Consult. Please do not reply.
        </p>
      </div>
    `;

    await this.sendEmail(email, subject, htmlContent, BREVO.TEMPLATES.PASSWORD_RESET);
  }

  async sendWelcomeEmail(email: string, name: string, applicationId?: string): Promise<void> {
    const subject = 'Welcome to SEA-FAJ Consult!';
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #28a745;">Welcome to SEA-FAJ Consult!</h2>
        <p>Dear ${name},</p>
        <p>Welcome to SEA-FAJ Consult! We're excited to help you on your journey.</p>
        ${applicationId ? `
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #28a745; margin-top: 0;">Your Application ID</h3>
            <p style="font-size: 18px; font-weight: bold; color: #2c3e50;">${applicationId}</p>
            <p style="font-size: 14px; color: #6c757d;">Please keep this ID safe for future reference.</p>
          </div>
        ` : ''}
        <p>You can now access your portal and start your application process.</p>
        <p>If you have any questions, feel free to contact our support team.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #6c757d; font-size: 12px;">
          This is an automated email from SEA-FAJ Consult. Please do not reply.
        </p>
      </div>
    `;

    await this.sendEmail(email, subject, htmlContent, BREVO.TEMPLATES.WELCOME);
  }

  async sendApplicationStatusEmail(
    email: string,
    name: string,
    status: string,
    applicationId: string
  ): Promise<void> {
    const subject = `Application Status Update - ${applicationId}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #007bff;">Application Status Update</h2>
        <p>Dear ${name},</p>
        <p>Your application <strong>${applicationId}</strong> status has been updated.</p>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">New Status</h3>
          <p style="font-size: 18px; font-weight: bold; color: #2c3e50;">${status}</p>
        </div>
        <p>Please log in to your portal to view more details.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #6c757d; font-size: 12px;">
          This is an automated email from SEA-FAJ Consult. Please do not reply.
        </p>
      </div>
    `;

    await this.sendEmail(email, subject, htmlContent, BREVO.TEMPLATES.APPLICATION_STATUS);
  }

  async sendPaymentConfirmationEmail(
    email: string,
    name: string,
    amount: number,
    reference: string
  ): Promise<void> {
    const subject = `Payment Confirmation - ${reference}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #28a745;">Payment Confirmation</h2>
        <p>Dear ${name},</p>
        <p>Your payment has been successfully processed.</p>
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #28a745; margin-top: 0;">Payment Details</h3>
          <p><strong>Amount:</strong> ₦${amount.toLocaleString()}</p>
          <p><strong>Reference:</strong> ${reference}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        <p>Thank you for your payment. You can view your receipt in your portal.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #6c757d; font-size: 12px;">
          This is an automated email from SEA-FAJ Consult. Please do not reply.
        </p>
      </div>
    `;

    await this.sendEmail(email, subject, htmlContent, BREVO.TEMPLATES.PAYMENT_CONFIRMATION);
  }
}
