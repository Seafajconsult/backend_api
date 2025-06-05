import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaTransaction {
  constructor(private prisma: PrismaService) {}

  /**
   * Execute multiple database operations in a transaction
   * @param operations Function containing the operations to execute
   * @returns Result of the transaction
   */
  async transaction<T>(
    operations: (prisma: Prisma.TransactionClient) => Promise<T>,
  ): Promise<T> {
    return this.prisma.$transaction(async (prisma) => {
      return operations(prisma);
    });
  }

  /**
   * Execute multiple database operations in an interactive transaction
   * This allows for committing or rolling back manually
   * @param operations Function containing the operations to execute
   * @returns Result of the transaction
   */
  async interactiveTransaction<T>(
    operations: (tx: {
      prisma: Prisma.TransactionClient;
      commit: () => Promise<void>;
      rollback: () => Promise<void>;
    }) => Promise<T>,
  ): Promise<T> {
    return this.prisma.$transaction(async (prisma) => {
      let committed = false;
      let rolledBack = false;

      const commit = async () => {
        committed = true;
      };

      const rollback = async () => {
        rolledBack = true;
        throw new Error('Transaction rolled back');
      };

      try {
        const result = await operations({ prisma, commit, rollback });

        if (rolledBack) {
          throw new Error('Transaction was rolled back');
        }

        if (!committed) {
          throw new Error('Transaction was not committed');
        }

        return result;
      } catch (error) {
        if (!rolledBack) {
          throw error;
        }
        throw new Error('Transaction was rolled back: ' + error.message);
      }
    });
  }
}

// Usage examples:
/*
// Simple transaction
await prismaTransaction.transaction(async (prisma) => {
  const newStudent = await prisma.student.create({
    data: { ... }
  });
  
  await prisma.application.create({
    data: {
      studentId: newStudent.id,
      ...
    }
  });
  
  return newStudent;
});

// Interactive transaction
await prismaTransaction.interactiveTransaction(async ({ prisma, commit, rollback }) => {
  const payment = await prisma.payment.create({
    data: { ... }
  });
  
  // External payment processing
  try {
    await processPayment(payment.id);
    await commit();
    return payment;
  } catch (error) {
    await rollback();
    throw error;
  }
});
*/
