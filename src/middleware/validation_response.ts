/* eslint-disable prettier/prettier */

import { ValidateResponse } from "./validate_response_interface";

export function validateResponse(message : string) : ValidateResponse{

    const validateFirstNameResponse = {
        status: 'Failed',
        message: message,
        statusCode: 201,
        data: {}
    }
    return validateFirstNameResponse;

}