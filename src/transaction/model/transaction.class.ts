/* eslint-disable prettier/prettier */

export interface Transaction {
    transaction_id?: number;
    item_id?: number;
    transactionReference?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    itemName?: string;
    transactionDescription?: string; 
    price?: number;
    createdAt?: Date;
}