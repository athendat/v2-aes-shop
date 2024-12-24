import { Component, EventEmitter, Input, Output, ViewChild, inject, input, linkedSignal, output, signal, viewChild } from '@angular/core';
import { Store, Select, select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '../../../shared/interface/user.interface';
import { AccountState } from '../../../shared/state/account.state';
import { Notification } from '../../../shared/interface/notification.interface';
import { NotificationState } from '../../../shared/state/notification.state';
import { Logout } from '../../../shared/action/auth.action';
import { ConfirmationModalComponent } from '../../../shared/components/widgets/modal/confirmation-modal/confirmation-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { TitleCasePipe } from '../../../shared/pipe/title-case.pipe';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [ButtonComponent, RouterLinkActive, RouterLink, ConfirmationModalComponent, TitleCasePipe, TranslateModule]
})
export class SidebarComponent {

    ConfirmationModal = viewChild<ConfirmationModalComponent>('confirmationModal');
    menu = output<boolean>();
    notification = select(NotificationState.notification);
    show = input<boolean>();
    unreadNotificationCount = linkedSignal<number>(() => {
        return this.notification().filter(item => !item.read_at).length;
    });
    user = select(AccountState.user);

    private store = inject(Store);

    logout() {
        this.store.dispatch(new Logout());
    }

    openMenu(value: boolean) {
        this.menu.emit(value)
    }
}
