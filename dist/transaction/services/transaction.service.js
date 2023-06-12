"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const transactions_entity_1 = require("../model/transactions.entity");
const reference_generator_1 = require("../../middleware/reference_generator");
const validations_1 = require("../../middleware/validations");
const validation_response_1 = require("../../middleware/validation_response");
const typeorm_1 = require("@nestjs/typeorm");
const rxjs_1 = require("rxjs");
const typeorm_2 = require("typeorm");
let TransactionService = exports.TransactionService = class TransactionService {
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    createTransaction(transactionDetails) {
        return (0, rxjs_1.from)(this.transactionRepository.save(transactionDetails));
    }
    async create(transactionDetails) {
        const dateTime = new Date();
        const reference = (0, reference_generator_1.referenceGenerator)();
        const { firstName, lastName, email, itemName, transactionDescription, price } = transactionDetails;
        const validateFirstName = (0, validations_1.nameValidation)(firstName);
        validateFirstName ? console.log(firstName) : (0, validation_response_1.validateResponse)("Enter a valid First Name");
        const validateLastName = (0, validations_1.nameValidation)(lastName);
        validateLastName ? console.log(lastName) : (0, validation_response_1.validateResponse)("Enter a valid Last Name");
        const validateEmail = (0, validations_1.emailValidation)(email);
        validateEmail ? console.log(email) : (0, validation_response_1.validateResponse)("Enter a valid Email");
        const validatePrice = (0, validations_1.priceValidation)(price);
        validatePrice ? console.log(price) : (0, validation_response_1.validateResponse)("Enter a valid price");
        try {
            const transactionEntity = transactions_entity_1.TransactionEntity.create();
            transactionEntity.firstName = firstName;
            transactionEntity.lastName = lastName;
            transactionEntity.email = email;
            transactionEntity.itemName = itemName;
            transactionEntity.transactionDescription = transactionDescription;
            transactionEntity.price = price;
            transactionEntity.createdAt = dateTime;
            transactionEntity.transactionReference = reference;
            const result = await transactions_entity_1.TransactionEntity.save(transactionEntity);
            const response = {
                status: 'Success',
                message: "Transaction is successfully",
                statusCode: 201,
                data: result
            };
            console.log(response);
            return response;
        }
        catch (error) {
            let errorMessage = "Internal Server Error";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            const response = {
                status: 'Failed',
                statusCode: 409,
                errorMessage: errorMessage,
                message: "Transaction was not successful."
            };
            console.log(errorMessage);
            return response;
        }
    }
    async getAllTransactions() {
        try {
            const result = await transactions_entity_1.TransactionEntity.find();
            const response = {
                status: 'Success',
                message: "All Transactions retrieved is successfully",
                statusCode: 201,
                data: result
            };
            console.log(response);
            return response;
        }
        catch (error) {
            let errorMessage = "Internal Server Error";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            const response = {
                status: 'Failed',
                statusCode: 409,
                errorMessage: errorMessage,
                message: "Transactions was not gotten successfully."
            };
            console.log(errorMessage);
            return response;
        }
    }
    async getOneTransactionDetails(transactionId) {
        console.log(typeof (transactionId));
        try {
            const transactionEntity = await transactions_entity_1.TransactionEntity.findOne({
                where: {
                    transaction_id: transactionId
                },
            });
            const response = {
                status: 'Success',
                message: "Transaction details retrieved successfully",
                statusCode: 201,
                data: transactionEntity
            };
            console.log(response);
            return response;
        }
        catch (error) {
            let errorMessage = "Internal Server Error";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            const response = {
                status: 'Failed',
                statusCode: 409,
                errorMessage: errorMessage,
                message: "Transaction was not retrieved successfully."
            };
            console.log(errorMessage);
            return response;
        }
    }
    async getTransactionDetailsByReference(transactionReferenceNumber) {
        console.log(typeof (transactionReferenceNumber));
        try {
            const transactionEntity = await transactions_entity_1.TransactionEntity.findOne({
                where: {
                    transactionReference: transactionReferenceNumber
                },
            });
            const response = {
                status: 'Success',
                message: "Transaction details retrieved successfully",
                statusCode: 201,
                data: transactionEntity
            };
            console.log(response);
            return response;
        }
        catch (error) {
            let errorMessage = "Internal Server Error";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            const response = {
                status: 'Failed',
                statusCode: 409,
                errorMessage: errorMessage,
                message: "Transaction was not retrieved successfully."
            };
            console.log(errorMessage);
            return response;
        }
    }
    async deleteTransactionDetails(transactionId) {
        console.log(typeof (transactionId));
        try {
            const transactionEntity = await transactions_entity_1.TransactionEntity.findOne({
                where: {
                    transaction_id: transactionId
                },
            });
            transactions_entity_1.TransactionEntity.delete;
            const response = {
                status: 'Success',
                message: "Transaction details retrieved successfully",
                statusCode: 201,
                data: transactionEntity
            };
            console.log(response);
            return response;
        }
        catch (error) {
            let errorMessage = "Internal Server Error";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            const response = {
                status: 'Failed',
                statusCode: 409,
                errorMessage: errorMessage,
                message: "Transaction was not retrieved successfully."
            };
            console.log(errorMessage);
            return response;
        }
    }
    async update(transactionId, transactionDetails) {
        const dateTime = new Date();
        const { firstName, lastName, email, itemName, transactionDescription, price } = transactionDetails;
        const validateFirstName = (0, validations_1.nameValidation)(firstName);
        validateFirstName ? console.log(firstName) : (0, validation_response_1.validateResponse)("Enter a valid First Name");
        const validateLastName = (0, validations_1.nameValidation)(lastName);
        validateLastName ? console.log(lastName) : (0, validation_response_1.validateResponse)("Enter a valid Last Name");
        const validateEmail = (0, validations_1.emailValidation)(email);
        validateEmail ? console.log(email) : (0, validation_response_1.validateResponse)("Enter a valid Email");
        const validatePrice = (0, validations_1.priceValidation)(price);
        validatePrice ? console.log(price) : (0, validation_response_1.validateResponse)("Enter a valid price");
        try {
            const transactionEntity = await transactions_entity_1.TransactionEntity.findOne({
                where: {
                    transaction_id: transactionId
                },
            });
            transactionEntity.firstName = firstName;
            transactionEntity.lastName = lastName;
            transactionEntity.email = email;
            transactionEntity.itemName = itemName;
            transactionEntity.transactionDescription = transactionDescription;
            transactionEntity.price = price;
            transactionEntity.updatedAt = dateTime;
            const result = await transactions_entity_1.TransactionEntity.save(transactionEntity);
            const response = {
                status: 'Success',
                message: "Transaction is successfully",
                statusCode: 201,
                data: result
            };
            console.log(response);
            return response;
        }
        catch (error) {
            let errorMessage = "Internal Server Error";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            const response = {
                status: 'Failed',
                statusCode: 409,
                errorMessage: errorMessage,
                message: "Transaction was not successful."
            };
            console.log(errorMessage);
            return response;
        }
    }
};
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transactions_entity_1.TransactionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map