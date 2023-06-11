/* eslint-disable prettier/prettier */

/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../model/transaction.class';

@Controller('transaction')
export class TransactionController { 

    //instantiate TransactionService in a constructor
    constructor(
        private readonly transactionServices: TransactionService
        ) 
    {}

    //'createTransaction()' will handle the creating of new Transaction
    @Post('createTransaction')
    createTransaction( @Body() transaction: Transaction) {
      return this.transactionServices.create(transaction);
    }

    //'updateTransaction()' will handle the updating of Transaction using transaction id gotten through the Params and Update Detail in the body
    @Put(':transactionId')
    updateTransaction( @Param('transactionId') transactionId: number, @Body() transaction: Transaction) {
      return this.transactionServices.update( transactionId, transaction);
    }
    
    //'getAllTransactions()' returns the list of all the created transactions in the database
    @Get()
    getAllTransactions() {
        return this.transactionServices.getAllTransactions();
    }

    //'getOneTransaction()' return all the details which are associated with one transaction 
    // provided through 'transactionID' by the request 
    @Get('transactionDetails')
    getOneTransaction( @Body('transactionID', ParseIntPipe) transactionID: number ) {
        return this.transactionServices.getOneTransactionDetails(transactionID);
    }

    //'deleteTransaction()' remove all the details which are associated with one transaction 
    // provided through 'transactionID' by the request in the body
    @Delete('deleteTransaction')
    deleteTransaction( @Body('transactionID', ParseIntPipe) transactionID: number ) {
        return this.transactionServices.deleteTransactionDetails(transactionID);
    }

}
