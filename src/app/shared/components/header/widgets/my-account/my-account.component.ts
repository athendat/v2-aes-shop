import { AsyncPipe } from '@angular/common';
import { Component, Input, ViewChild, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { select, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logout } from '../../../../action/auth.action';
import { AccountUser } from '../../../../interface/account.interface';
import { AccountState } from '../../../../state/account.state';
import { AuthState } from '../../../../state/auth.state';
import { ConfirmationModalComponent } from '../../../widgets/modal/confirmation-modal/confirmation-modal.component';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss'],
    imports: [RouterLink, ConfirmationModalComponent, TranslateModule]
})
export class MyAccountComponent {


    isAuthenticated = select(AuthState.isAuthenticated);
    style = input<string>('basic');
    user = select(AccountState.user);

    @ViewChild("confirmationModal") ConfirmationModal: ConfirmationModalComponent;

    #store = inject(Store);
    #router = inject(Router);

    logout() {
        this.#store.dispatch(new Logout());
        this.#router.navigateByUrl('/');
    }

}
