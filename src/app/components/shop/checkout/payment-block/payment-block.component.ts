import { Component, output, input } from '@angular/core';
import { PaymentMethod } from 'src/app/shared/interface/payment-method.interface';

@Component({
    selector: 'app-payment-block',
    templateUrl: './payment-block.component.html',
})
export class PaymentBlockComponent {

    paymentMethods = input<PaymentMethod[]>([])
    selectPaymentMethod = output<string>();

    constructor() {
    }

    set(event: Event) {
        this.selectPaymentMethod.emit((<HTMLInputElement>event.target)?.value);
    }
}

