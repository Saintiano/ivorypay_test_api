/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import httpMocks from 'node-mocks-http';

import { TransactionService } from './transaction.service';
import { Transaction } from '../model/transaction.class';
import { TransactionEntity } from '../model/transactions.entity';

describe('TransactionService', () => {
  let transactionService: TransactionService;

  const mockRequest = httpMocks.createRequest();

  const mockTransactionPost: Transaction = {
    firstName: 'Clovis',
    lastName: 'Saintiano',
    email:"clovis@gmail.com",
    itemName: "Ivorypay Gold investment",
    transactionDescription: 'Buying Gold investment',
    transactionReference: 'IvoryPaywiejilrejf',
    createdAt: new Date(),
  };

  const mockCreateTranctionRepository = {
    createTransactionPost: jest
      .fn()
      .mockImplementation(( transaction: Transaction) => {
        return {
          ...transaction,
        };
      }),
    save: jest
      .fn()
      .mockImplementation((transaction: Transaction) =>
        Promise.resolve({ id: 1, ...transaction }),
      ),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getRepositoryToken(TransactionEntity),
          useValue: mockCreateTranctionRepository,
        },
      ],
    }).compile();

    transactionService = moduleRef.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(transactionService).toBeDefined();
  });

  it('should create a transaction', (done: jest.DoneCallback) => {
    transactionService
      .createTransaction(mockTransactionPost)
      .subscribe((transaction: Transaction) => {
        expect(transaction).toEqual({
          id: expect.any(Number),
          ...mockTransactionPost,
        });
        done();
      });
  });
});