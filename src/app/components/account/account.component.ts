import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoaderState } from '../../shared/state/loader.state';
import { Breadcrumb } from '../../shared/interface/breadcrumb';
import { GetNotification } from '../../shared/action/notification.action';
import { AuthStore } from 'src/app/shared/store/auth.store';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountComponent {

    @Select(LoaderState.status) loadingStatus$: Observable<boolean>;

    public open: boolean = false;
    public breadcrumb: Breadcrumb = {
        title: "Dashboard",
        items: [{ label: 'Dashboard', active: false }]
    };
    authStore = inject(AuthStore);

    constructor(private store: Store) {
        this.store.dispatch(new GetNotification());
    }

    openMenu(value: any) {
        this.open = value;
    }

}
