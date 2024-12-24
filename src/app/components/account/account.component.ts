import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { select, Store } from '@ngxs/store';
import { TranslateModule } from '@ngx-translate/core';

import { GetNotification } from '../../shared/action/notification.action';
import { LoaderState } from '../../shared/state/loader.state';

import { BreadcrumbComponent } from '../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '../../shared/components/widgets/button/button.component';
import { LoaderComponent } from '../../shared/components/widgets/loader/loader.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { Breadcrumb } from '../../shared/interface/breadcrumb';


@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    imports: [BreadcrumbComponent, SidebarComponent, LoaderComponent, ButtonComponent, RouterOutlet, TranslateModule]
})
export class AccountComponent {

    loadingStatus = select(LoaderState.status);
    open = signal<boolean>(false);
    breadcrumb = signal<Breadcrumb>({
        title: "Dashboard",
        items: [{ label: 'Dashboard', active: false }]
    });

    #store = inject(Store);

    constructor() {
        this.#store.dispatch(new GetNotification());
    }

    openMenu(value: any) {
        this.open.set(value);
    }

}
