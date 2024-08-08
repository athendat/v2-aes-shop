import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product, Variation } from '../../../../../../shared/interface/product.interface';
import { Cart, CartAddOrUpdate } from '../../../../../../shared/interface/cart.interface';
import { AddToCart } from '../../../../../../shared/action/cart.action';
import { CartState } from '../../../../../../shared/state/cart.state';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AuthStore } from 'src/app/shared/store/auth.store';

@Component({
    selector: 'app-sticky-checkout',
    templateUrl: './sticky-checkout.component.html',
    styleUrls: ['./sticky-checkout.component.scss']
})
export class StickyCheckoutComponent {

    @Input() product: Product;

    @Select(CartState.cartItems) cartItem$: Observable<Cart[]>;

    public cartItem: Cart | null;
    public productQty: number = 1;
    public selectedVariation: Variation | null;

    #authStore = inject(AuthStore);
    #notificationService = inject(NotificationService);

    constructor(private store: Store) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['product'] && changes['product'].currentValue) {
            this.product = changes['product']?.currentValue;
        }
        this.cartItem$.subscribe(items => {
            this.cartItem = items.find(item => item.product.id == this.product.id)!;
        });
    }

    selectVariation(variation: Variation) {
        this.selectedVariation = variation;
    }

    updateQuantity(qty: number) {
        if (1 > this.productQty + (qty)) return;
        this.productQty = this.productQty + (qty);
        this.checkStockAvailable();
    }

    checkStockAvailable() {
        if (this.selectedVariation) {
            this.selectedVariation['stock_status'] = this.selectedVariation?.quantity < this.productQty ? 'out_of_stock' : 'in_stock';
        } else {
            this.product['stock_status'] = this.product?.quantity < this.productQty ? 'out_of_stock' : 'in_stock';
        }
    }

    addToCart(product: Product) {

        // Si el usuario no está autenticado, mostrar un mensaje de alerta
        if (!this.#authStore.isAuthenticated()) {
            this.#notificationService.showInfo('Debes iniciar sesión para agregar productos al carrito.');
            return;
        }

        if (product) {
            const params: CartAddOrUpdate = {
                id: this.cartItem ? this.cartItem.id : null,
                product_id: product?.id!,
                product: product ? product : null,
                variation: this.selectedVariation ? this.selectedVariation : null,
                variation_id: this.selectedVariation?.id ? this.selectedVariation?.id! : null,
                quantity: this.productQty
            }
            this.store.dispatch(new AddToCart(params));
        }
    }

}
