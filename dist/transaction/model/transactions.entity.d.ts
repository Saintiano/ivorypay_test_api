import { BaseEntity } from 'typeorm';
export declare class TransactionEntity extends BaseEntity {
    transaction_id: number;
    transactionReference: string;
    firstName: string;
    lastName: string;
    email: string;
    itemName: string;
    price: number;
    transactionDescription: string;
    createdAt: Date;
    updatedAt: Date;
}
