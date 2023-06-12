"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.referenceGenerator = void 0;
function referenceGenerator() {
    const orderNumberLength = 14;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const charactersLength = characters.length;
    let resultOrderNumber = 'IvoryPay';
    for (let i = 0; i < orderNumberLength; i++) {
        resultOrderNumber += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return resultOrderNumber;
}
exports.referenceGenerator = referenceGenerator;
//# sourceMappingURL=reference_generator.js.map