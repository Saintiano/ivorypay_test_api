import { Transaction } from '../model/transaction.class';
import { TransactionEntity } from '../model/transactions.entity';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
export declare class TransactionService {
    private readonly transactionRepository;
    constructor(transactionRepository: Repository<TransactionEntity>);
    createTransaction(transactionDetails: Transaction): Observable<Transaction>;
    create(transactionDetails: Transaction): Promise<TransactionEntity | any>;
    getAllTransactions(): Promise<Transaction[] | any>;
    getOneTransactionDetails(transactionId: number): Promise<Transaction | any>;
    getTransactionDetailsByReference(transactionReferenceNumber: string): Promise<Transaction | any>;
    deleteTransactionDetails(transactionId: number): Promise<Transaction | any>;
    update(transactionId: number, transactionDetails: Transaction): Promise<TransactionEntity | any>;
}
