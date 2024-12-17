import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '../../../shared/interface/user.interface';
import { AccountState } from '../../../shared/state/account.state';
import { Notification } from '../../../shared/interface/notification.interface';
import { NotificationState } from '../../../shared/state/notification.state';
import { Logout } from '../../../shared/action/auth.action';
import { ConfirmationModalComponent } from '../../../shared/components/widgets/modal/confirmation-modal/confirmation-modal.component';
import { AuthStore } from 'src/app/shared/store/auth.store';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SidebarComponent {

    @Input() show: boolean;
    @Output() menu: EventEmitter<boolean> = new EventEmitter();

    @Select(NotificationState.notification) notification$: Observable<Notification[]>;
    @Select(AccountState.user) user$: Observable<User>;

    @ViewChild("confirmationModal") ConfirmationModal: ConfirmationModalComponent;
    authStore = inject(AuthStore);
    public unreadNotificationCount: number;

    constructor(private store: Store) {
        this.notification$.subscribe((notification) => {
            this.unreadNotificationCount = notification?.filter(item => !item.read_at)?.length;
        });
    }

    logout() {
        this.store.dispatch(new Logout());
    }

    openMenu(value: boolean) {
        this.menu.emit(value)
    }
}
