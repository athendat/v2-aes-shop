import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountUser } from "../../../shared/interface/account.interface";
import { AccountState } from '../../../shared/state/account.state';
import { DeleteAddress } from '../../../shared/action/account.action';
import { AddressModalComponent } from '../../../shared/components/widgets/modal/address-modal/address-modal.component';
import { DeleteModalComponent } from '../../../shared/components/widgets/modal/delete-modal/delete-modal.component';
import { UserAddress } from '../../../shared/interface/user.interface';
import { AuthStore } from 'src/app/shared/store/auth.store';

@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressesComponent {

    authStore = inject(AuthStore);

    #store = inject(Store);
    user$ = this.#store.select(AccountState.user);

    @ViewChild("addressModal") AddressModal: AddressModalComponent;
    @ViewChild("deleteModal") DeleteModal: DeleteModalComponent;



    delete(action: string, data: UserAddress) {
        if (action == 'delete')
            this.#store.dispatch(new DeleteAddress(data.id));
    }

}
