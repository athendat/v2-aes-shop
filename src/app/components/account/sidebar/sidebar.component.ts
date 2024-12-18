import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { Store, Select } from '@ngxs/store';
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
    imports: [ButtonComponent, RouterLinkActive, RouterLink, ConfirmationModalComponent, AsyncPipe, TitleCasePipe, TranslateModule]
})
export class SidebarComponent {
  private store = inject(Store);


  @Input() show: boolean;
  @Output() menu: EventEmitter<boolean> = new EventEmitter();

  @Select(NotificationState.notification) notification$: Observable<Notification[]>;
  @Select(AccountState.user) user$: Observable<User>;

  @ViewChild("confirmationModal") ConfirmationModal: ConfirmationModalComponent;

  public unreadNotificationCount: number;

  constructor() {
    this.notification$.subscribe((notification) => {
      this.unreadNotificationCount = notification?.filter(item => !item.read_at).length;
    });
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  openMenu(value: boolean){
    this.menu.emit(value)
  }
}
