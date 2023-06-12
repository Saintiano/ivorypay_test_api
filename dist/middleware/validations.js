"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameValidation = exports.priceValidation = exports.emailValidation = void 0;
function emailValidation(email) {
    const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const result = expression.test(email);
    console.log('e-mail is ' + (result ? 'correct' : 'incorrect'));
    return result;
}
exports.emailValidation = emailValidation;
function priceValidation(price) {
    const RegExp = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;
    const isPriceValid = RegExp.test(price.toString());
    console.log('price is ' + (isPriceValid ? 'correct' : 'incorrect'));
    return isPriceValid;
}
exports.priceValidation = priceValidation;
function nameValidation(name) {
    const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const isVameValid = regName.test(name);
    console.log('name is ' + (isVameValid ? 'correct' : 'incorrect'));
    return isVameValid;
}
exports.nameValidation = nameValidation;
//# sourceMappingURL=validations.js.map