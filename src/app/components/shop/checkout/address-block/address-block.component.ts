import { Component, Input, ChangeDetectionStrategy, output } from '@angular/core';
import { UserAddress } from '../../../../shared/interface/user.interface';

@Component({
    selector: 'app-address-block',
    templateUrl: './address-block.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressBlockComponent {

    @Input() addresses?: UserAddress[] = [];
    @Input() type: string = 'shipping';

    selectAddress = output<string>();

    constructor() { }

    ngOnInit() {

        // Automatically emit the selectAddress event for the first item if it's available
        if (this.addresses && this.addresses.length > 0) {
            const firstAddressId = this.addresses[0].id;
            this.selectAddress.emit(firstAddressId);
        }
    }

    set(event: Event) {
        this.selectAddress.emit((<HTMLInputElement>event.target)?.value);
    }

}
