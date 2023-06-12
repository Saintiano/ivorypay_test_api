import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../model/transaction.class';
export declare class TransactionController {
    private readonly transactionServices;
    constructor(transactionServices: TransactionService);
    createTransaction(transaction: Transaction): Promise<any>;
    updateTransaction(transactionId: number, transaction: Transaction): Promise<any>;
    getAllTransactions(): Promise<any>;
    getOneTransaction(transactionID: number): Promise<any>;
    deleteTransaction(transactionID: number): Promise<any>;
}
