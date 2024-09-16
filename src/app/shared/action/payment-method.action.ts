import { Params } from "../interface/core.interface";
import { PaymentMethod } from "../interface/payment-method.interface";

export class GetPaymentMethods {
    static readonly type = "[PaymentMethod] Get";
    constructor(public payload?: Params) { }
}
