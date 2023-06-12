/* eslint-disable prettier/prettier */

export function referenceGenerator() : string {

    const orderNumberLength = 14;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const charactersLength = characters.length;
    let resultOrderNumber = 'IvoryPay';
    for(let i = 0; i < orderNumberLength; i++) {
        resultOrderNumber += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return resultOrderNumber;

}