import { PaystackService } from './paystack.service';
import { InitializePaymentDto } from './dto';
export declare class PaymentsController {
    private readonly paystackService;
    constructor(paystackService: PaystackService);
    initializePayment(initializePaymentDto: InitializePaymentDto, req: any): Promise<import("./paystack.service").PaystackInitializeResponse>;
    verifyPayment(reference: string): Promise<import("./paystack.service").PaystackVerifyResponse>;
    getPaymentHistory(req: any): Promise<{
        type: string;
        id: string;
        status: import(".prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        amount: number;
        reference: string;
        currency: string;
        paymentDate: Date | null;
    }[]>;
    getAllPayments(page?: string, limit?: string, status?: string, type?: string): Promise<{
        message: string;
        filters: {
            page: string;
            limit: string;
            status: string | undefined;
            type: string | undefined;
        };
    }>;
    test(): Promise<{
        message: string;
        timestamp: string;
        endpoints: string[];
    }>;
}
