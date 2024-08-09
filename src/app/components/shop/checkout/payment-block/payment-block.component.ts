import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, output } from '@angular/core';
import { Values } from '../../../../shared/interface/setting.interface';

@Component({
    selector: 'app-payment-block',
    templateUrl: './payment-block.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentBlockComponent {

    @Input() setting: Values;
    selectPaymentMethod = output<string>();

    paymentMethodsArray: any[] = [];


    constructor() { }

    ngOnInit() {
        this.paymentMethodsArray = Object.entries(this.setting?.payment_methods!).map(([method, details]) => {
            return {
                name: method.replace(/_/g, ' '),
                status: details.status
            };
        });

        // Automatically emit the selectAddress event for the first item if it's available
        if (this.setting && this.setting?.payment_methods?.length! > 0) {
            if (this.setting?.payment_methods?.[0].status) {
                this.selectPaymentMethod.emit(this.setting?.payment_methods?.[0].name);
            }
        }
    }

    set(value: string) {
        this.selectPaymentMethod.emit(value);
    }



}

