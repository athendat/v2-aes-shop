import { ChangeDetectionStrategy, Component, Input, ViewChild, inject } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ProductDetailModalComponent } from '../../../widgets/modal/product-detail-modal/product-detail-modal.component';
import { Product } from '../../../../../shared/interface/product.interface';
import { CartAddOrUpdate, Cart } from '../../../../../shared/interface/cart.interface';
import { AddToWishlist, DeleteWishlist } from '../../../../../shared/action/wishlist.action';
import { AddToCompare } from '../../../../../shared/action/compare.action';
import { AddToCart } from '../../../../../shared/action/cart.action';
import { CartState } from '../../../../../shared/state/cart.state';
import { VariationModalComponent } from '../../modal/variation-modal/variation-modal.component';
import { AuthStore } from 'src/app/shared/store/auth.store';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
    selector: 'app-product-box-horizontal',
    templateUrl: './product-box-horizontal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductBoxHorizontalComponent {

    @Input() product: Product;
    @Input() class: string;
    @Input() close: boolean;

    #store = inject(Store);
    cartItem$: Observable<Cart[]> = this.#store.select(CartState.cartItems);

    @ViewChild("productDetailModal") productDetailModal: ProductDetailModalComponent;
    @ViewChild("variationModal") VariationModal: VariationModalComponent;

    public cartItem: Cart | null;
    public currentDate: number | null;
    public saleStartDate: number | null;

    #authStore = inject(AuthStore);
    #notificationService = inject(NotificationService);

    constructor(
        config: NgbRatingConfig,
    ) {
        config.max = 5;
        config.readonly = true;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On Init
     */
    ngOnInit() {
        this.cartItem$.subscribe(items => {
            this.cartItem = items.find(item => item.product.id == this.product.id)!;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public Methods
    // -----------------------------------------------------------------------------------------------------

    addToCart(product: Product, qty: number) {

        // Si el usuario no está autenticado, mostrar un mensaje de alerta
        if (!this.#authStore.isAuthenticated()) {
            this.#notificationService.showInfo('Debes iniciar sesión para agregar productos al carrito.');
            return;
        }

        const params: CartAddOrUpdate = {
            id: this.cartItem ? this.cartItem.id : null,
            product: product,
            product_id: product?.id,
            variation_id: this.cartItem ? this.cartItem?.variation_id : null,
            variation: this.cartItem ? this.cartItem?.variation : null,
            quantity: qty,
            price: product?.sale_price,
        }
        this.#store.dispatch(new AddToCart(params));
    }

    addToWishlist(id: string) {

        // Si el usuario no está autenticado, mostrar un mensaje de alerta
        if (!this.#authStore.isAuthenticated()) {
            this.#notificationService.showInfo('Debes iniciar sesión para agregar el producto a su lista de deseo.');
            return;
        }

        this.#store.dispatch(new AddToWishlist({ product_id: id }));
    }

    removeWishlist(id: string) {
        this.#store.dispatch(new DeleteWishlist(id));
    }

    addToCompar(id: string) {
        this.#store.dispatch(new AddToCompare({ product_id: id }));
    }

}
