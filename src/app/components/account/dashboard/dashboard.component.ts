import { Component, ViewChild } from '@angular/core';
import { select, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User, UserAddress } from '../../../shared/interface/user.interface';
import { AccountState } from '../../../shared/state/account.state';
import { EditProfileModalComponent } from '../../../shared/components/widgets/modal/edit-profile-modal/edit-profile-modal.component';
import { ChangePasswordModalComponent } from '../../../shared/components/widgets/modal/change-password-modal/change-password-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency-symbol.pipe';
import { TitleCasePipe } from '../../../shared/pipe/title-case.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [CurrencySymbolPipe],
    imports: [
        EditProfileModalComponent,
        ChangePasswordModalComponent,
        TitleCasePipe,
        CurrencySymbolPipe,
        TranslateModule
    ]
})
export class DashboardComponent {

    @Select(AccountState.user) user$: Observable<User>;
    user = select(AccountState.user);

    @ViewChild("profileModal") ProfileModal: EditProfileModalComponent;
    @ViewChild("passwordModal") PasswordModal: ChangePasswordModalComponent;

    public address: UserAddress | null;

    constructor() {
        this.user$.subscribe(user => {
            this.address = user?.address?.length ? user?.address?.[0] : null;
        });
    }

}
