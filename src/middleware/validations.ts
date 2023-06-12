/* eslint-disable prettier/prettier */

export function emailValidation(email : string) : boolean {

    const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const result: boolean = expression.test(email); // true
    console.log('e-mail is ' + (result ? 'correct' : 'incorrect'));

    return result;

}

export function priceValidation(price : number) : boolean{

    const RegExp = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;
    const isPriceValid = RegExp.test(price.toString());
    console.log('price is ' + (isPriceValid ? 'correct' : 'incorrect'));
    return isPriceValid;

}

export function nameValidation(name : string) {

    const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const isVameValid = regName.test(name);
    console.log('name is ' + (isVameValid ? 'correct' : 'incorrect'));
    return isVameValid;

}

