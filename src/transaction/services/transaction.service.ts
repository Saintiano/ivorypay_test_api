/* eslint-disable prettier/prettier */

/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Transaction } from '../model/transaction.class';
import { TransactionEntity } from '../model/transactions.entity';
import { referenceGenerator } from 'src/middleware/reference_generator';
import { emailValidation, nameValidation, priceValidation } from 'src/middleware/validations';
import { validateResponse } from 'src/middleware/validation_response';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService { 

    constructor(
        @InjectRepository(TransactionEntity)
        private readonly transactionRepository: Repository<TransactionEntity>,
    ) {}

    createTransaction(transactionDetails: Transaction): Observable<Transaction> {
        return from(this.transactionRepository.save(transactionDetails));
    }

    //Create a transaction
    async create(transactionDetails: Transaction): Promise<TransactionEntity | any> {

        //get current date and time
        const dateTime = new Date();
        //generate a transaction reference for new transactions
        const reference = referenceGenerator();

        //retrieve transaction payloads from api body and fill the object fields
        const {firstName, lastName, email, itemName, transactionDescription, price} = transactionDetails;

        const validateFirstName = nameValidation(firstName); //Validate first name field
        validateFirstName ? console.log(firstName) : validateResponse("Enter a valid First Name");
        const validateLastName = nameValidation(lastName); //Validate last name field
        validateLastName ? console.log(lastName) : validateResponse("Enter a valid Last Name");
        const validateEmail = emailValidation(email); //Validate email field
        validateEmail ? console.log(email) : validateResponse("Enter a valid Email");
        const validatePrice = priceValidation(price); //Validate item name field
        validatePrice ? console.log(price) : validateResponse("Enter a valid price");

        try {

            //create instance of transaction entity
            const transactionEntity: TransactionEntity = TransactionEntity.create();

            transactionEntity.firstName = firstName;
            transactionEntity.lastName = lastName;
            transactionEntity.email = email;
            transactionEntity.itemName = itemName;
            transactionEntity.transactionDescription = transactionDescription;
            transactionEntity.price = price;
            transactionEntity.createdAt = dateTime;
            transactionEntity.transactionReference = reference;

            //save data into transaction db
            const result = await TransactionEntity.save(transactionEntity);

            //send response to the user
            const response = {
                status: 'Success',
                message: "Transaction is successfully",
                statusCode: 201,
                data: result
            }
    
            console.log(response); 

            return response;
            
        } catch (error) {

            let errorMessage = "Internal Server Error";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            const response = {
                status: 'Failed', 
                statusCode: 409,
                errorMessage: errorMessage,
                message: "Transaction was not successful."
            }
            
            console.log(errorMessage);
            return response;
            
        }

    }

    //Get all transactions
    async getAllTransactions(): Promise<Transaction[] | any> {

        try {

            const result = await TransactionEntity.find();

            //send response to the user
            const response = {
                status: 'Success',
                message: "All Transactions retrieved is successfully",
                statusCode: 201,
                data: result
            }
    
            console.log(response); 

            return response;
            
        } catch (error) {

            let errorMessage = "Internal Server Error";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            const response = {
                status: 'Failed', 
                statusCode: 409,
                errorMessage: errorMessage,
                message: "Transactions was not gotten successfully."
            }
            
            console.log(errorMessage);
            return response;
            
        }
            
    }

    //Get a transaction
    async getOneTransactionDetails(transactionId: number): Promise<Transaction | any> {

        console.log(typeof(transactionId));

        try {

            const transactionEntity : TransactionEntity = await TransactionEntity.findOne(
                {
                    where: {
                        transaction_id: transactionId
                    },
                }
            );

            //send response to the user
            const response = {
                status: 'Success',
                message: "Transaction details retrieved successfully",
                statusCode: 201,
                data: transactionEntity
            }
    
            console.log(response); 

            return response;

        } catch (error) {

            let errorMessage = "Internal Server Error";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            const response = {
                status: 'Failed', 
                statusCode: 409,
                errorMessage: errorMessage,
                message: "Transaction was not retrieved successfully."
            }
            
            console.log(errorMessage);
            return response;
            
        }
        
        

    }

    //Get a transaction by reference number
    async getTransactionDetailsByReference(transactionReferenceNumber: string): Promise<Transaction | any> {

        console.log(typeof(transactionReferenceNumber));

        try {

            const transactionEntity: TransactionEntity = await TransactionEntity.findOne(
                {
                    where: {
                        transactionReference : transactionReferenceNumber
                    },
                }
            );

            //send response to the user
            const response = {
                status: 'Success',
                message: "Transaction details retrieved successfully",
                statusCode: 201,
                data: transactionEntity
            }
    
            console.log(response); 

            return response;

        } catch (error) {

            let errorMessage = "Internal Server Error";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            const response = {
                status: 'Failed', 
                statusCode: 409,
                errorMessage: errorMessage,
                message: "Transaction was not retrieved successfully."
            }
            
            console.log(errorMessage);
            return response;
            
        }
        
        

    }

    //Delete a transaction
    async deleteTransactionDetails(transactionId: number): Promise<Transaction | any> {

            console.log(typeof(transactionId));
    
            try {
    
                const transactionEntity: TransactionEntity = await TransactionEntity.findOne(
                    {
                        where: {
                            transaction_id: transactionId
                        },
                    }
                );

                TransactionEntity.delete
    
                //send response to the user
                const response = {
                    status: 'Success',
                    message: "Transaction details retrieved successfully",
                    statusCode: 201,
                    data: transactionEntity
                }
        
                console.log(response); 
    
                return response;
    
            } catch (error) {
    
                let errorMessage = "Internal Server Error";
    
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
    
                const response = {
                    status: 'Failed', 
                    statusCode: 409,
                    errorMessage: errorMessage,
                    message: "Transaction was not retrieved successfully."
                }
                
                console.log(errorMessage);
                return response;
                
            }
            
    
    }

    //update a transaction record in the table with the provided id and request body.
    async update(transactionId: number, transactionDetails: Transaction): Promise<TransactionEntity | any> {

        //get current date and time
        const dateTime = new Date();

        //retrieve transaction payloads from api body and fill the object fields
        const {firstName, lastName, email, itemName, transactionDescription, price} = transactionDetails;
        const validateFirstName = nameValidation(firstName); //Validate first name field
        validateFirstName ? console.log(firstName) : validateResponse("Enter a valid First Name");
        const validateLastName = nameValidation(lastName); //Validate last name field
        validateLastName ? console.log(lastName) : validateResponse("Enter a valid Last Name");
        const validateEmail = emailValidation(email); //Validate email field
        validateEmail ? console.log(email) : validateResponse("Enter a valid Email");
        const validatePrice = priceValidation(price); //Validate item name field
        validatePrice ? console.log(price) : validateResponse("Enter a valid price");
        
        try {
            

            const transactionEntity: TransactionEntity = await TransactionEntity.findOne(
                {
                    where: {
                        transaction_id: transactionId
                    },
                }
            );

            transactionEntity.firstName = firstName;
            transactionEntity.lastName = lastName;
            transactionEntity.email = email;
            transactionEntity.itemName = itemName;
            transactionEntity.transactionDescription = transactionDescription;
            transactionEntity.price = price;
            transactionEntity.updatedAt = dateTime;

            //save data into transaction db
            const result = await TransactionEntity.save(transactionEntity);

            //send response to the user
            const response = {
                status: 'Success',
                message: "Transaction is successfully",
                statusCode: 201,
                data: result
            }
    
            console.log(response); 

            return response;
            
        } catch (error) {

            let errorMessage = "Internal Server Error";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            const response = {
                status: 'Failed', 
                statusCode: 409,
                errorMessage: errorMessage,
                message: "Transaction was not successful."
            }
            
            console.log(errorMessage);
            return response;
            
        }

    }


}
