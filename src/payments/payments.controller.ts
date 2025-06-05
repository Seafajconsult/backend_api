import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaystackService } from './paystack.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../prisma/types';
import { InitializePaymentDto, VerifyPaymentDto } from './dto';

@ApiTags('Payments')
@Controller('payments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PaymentsController {
  constructor(private readonly paystackService: PaystackService) {}

  @Post('initialize')
  @ApiOperation({ summary: 'Initialize a payment transaction' })
  @ApiResponse({ status: 201, description: 'Payment initialized successfully' })
  @ApiResponse({ status: 400, description: 'Invalid payment data' })
  async initializePayment(
    @Body() initializePaymentDto: InitializePaymentDto,
    @Request() req: any,
  ) {
    const { amount, type, metadata } = initializePaymentDto;
    const user = req.user;

    return this.paystackService.initializePayment(
      user.email,
      amount,
      type,
      user.id,
      metadata,
    );
  }

  @Post('verify/:reference')
  @ApiOperation({ summary: 'Verify a payment transaction' })
  @ApiResponse({ status: 200, description: 'Payment verified successfully' })
  @ApiResponse({ status: 400, description: 'Payment verification failed' })
  async verifyPayment(@Param('reference') reference: string) {
    return this.paystackService.verifyPayment(reference);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get payment history for current user' })
  @ApiResponse({ status: 200, description: 'Payment history retrieved successfully' })
  async getPaymentHistory(@Request() req: any) {
    const user = req.user;
    const userType = user.role === UserRole.STUDENT ? 'student' : 'employer';

    return this.paystackService.getPaymentHistory(user.id, userType);
  }

  @Get('admin/all')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get all payments (Admin only)' })
  @ApiResponse({ status: 200, description: 'All payments retrieved successfully' })
  async getAllPayments(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('status') status?: string,
    @Query('type') type?: string,
  ) {
    // This would be implemented in the PaystackService
    // For now, return a placeholder
    return {
      message: 'Admin payment management endpoint',
      filters: { page, limit, status, type },
    };
  }

  @Get('test')
  @ApiOperation({ summary: 'Test payments module' })
  @ApiResponse({ status: 200, description: 'Payments module is working' })
  async test() {
    return {
      message: 'Payments module is working correctly',
      timestamp: new Date().toISOString(),
      endpoints: [
        'POST /payments/initialize',
        'POST /payments/verify/:reference',
        'GET /payments/history',
        'GET /payments/admin/all',
      ],
    };
  }
}
