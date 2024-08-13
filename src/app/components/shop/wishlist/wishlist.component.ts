import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetWishlist } from './../../../shared/action/wishlist.action';
import { WishlistState } from '../../../shared/state/wishlist.state';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { WishlistModel } from '../../../shared/interface/wishlist.interface';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { AuthStore } from 'src/app/shared/store/auth.store';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistComponent implements OnInit {

    #store = inject(Store);
    #notify = inject(NotificationService);

    authStore = inject(AuthStore);
    breadcrumb: Breadcrumb = {
        title: "Lista de Deseos",
        items: [{ label: 'Lista de Deseos', active: true }]
    }
    skeletonItems = Array.from({ length: 12 }, (_, index) => index);
    wishlistService = inject(WishlistService);
    wishlistItems$: Observable<WishlistModel> = this.#store.select(WishlistState.wishlistItems);

    constructor() {

        // Sino hay usuario logueado, no se puede acceder a la lista de deseos
        if (this.authStore.isAuthenticated()) {
            this.#store.dispatch(new GetWishlist())
        }

    }

    ngOnInit(): void {

        if (!this.authStore.isAuthenticated()) {

            this.#notify.showInfo('Debes iniciar sesión para ver tu lista de deseo');
        }

    }
}
