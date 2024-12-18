import { Component, inject } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Cart, CartAddOrUpdate } from '../../../shared/interface/cart.interface';
import { CartState } from '../../../shared/state/cart.state';
import { UpdateCart, DeleteCart } from '../../../shared/action/cart.action';
import { AddToWishlist } from '../../../shared/action/wishlist.action';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency-symbol.pipe';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    standalone: true,
    providers:[CurrencySymbolPipe],
    imports: [BreadcrumbComponent, RouterLink, ButtonComponent,
      NoDataComponent, AsyncPipe, CurrencySymbolPipe, TranslateModule]
})
export class CartComponent {
  private store = inject(Store);


  @Select(CartState.cartItems) cartItem$: Observable<Cart[]>;
  @Select(CartState.cartTotal) cartTotal$: Observable<number>;

  public breadcrumb: Breadcrumb = {
    title: "Cart",
    items: [{ label: 'Cart', active: true }]
  }

  updateQuantity(item: Cart, qty: number) {
    const params: CartAddOrUpdate = {
      id: item.id,
      product: item.product,
      product_id: item.product.id,
      variation: item.variation,
      variation_id: item?.variation_id ? item?.variation_id : null,
      quantity: qty
    }
    this.store.dispatch(new UpdateCart(params));
  }

  delete(id: string) {
    this.store.dispatch(new DeleteCart(id));
  }

  addToWishlist(id: string){
    this.store.dispatch(new AddToWishlist({ product_id: id }));
  }

}
