import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsPositive, IsIn } from 'class-validator';

export class InitializePaymentDto {
  @ApiProperty({ example: 50000, description: 'Amount in Naira' })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ 
    example: 'service_fee', 
    description: 'Type of payment',
    enum: ['service_fee', 'recruitment_fee', 'subscription_fee']
  })
  @IsString()
  @IsIn(['service_fee', 'recruitment_fee', 'subscription_fee'])
  type: string;

  @ApiProperty({ 
    example: { description: 'University application fee' }, 
    required: false,
    description: 'Additional metadata for the payment'
  })
  @IsOptional()
  metadata?: any;
}

export class VerifyPaymentDto {
  @ApiProperty({ example: 'SEA_1234567890_ABC123' })
  @IsString()
  reference: string;
}
