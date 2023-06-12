/* eslint-disable prettier/prettier */

import { TransactionService } from './services/transaction.service';
import { Module } from '@nestjs/common';
import { TransactionController } from './controller/transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './model/transactions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity])
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}