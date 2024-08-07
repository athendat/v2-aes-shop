import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolver } from '../../shared/resolvers/product.resolver';
import { StoreResolver } from '../../shared/resolvers/store.resolver';

// Guard
import { AuthGuard } from "./../../core/guard/auth.guard";

// Components
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CompareComponent } from './compare/compare.component';

// Seller
import { SellerComponent } from './seller/seller.component';
import { SellerStoreComponent } from './seller/seller-store/seller-store.component';
import { SellerDetailsComponent } from './seller/seller-details/seller-details.component';

// Product
import { ProductComponent } from './product/product.component';

// Collection
import { CollectionComponent } from './collection/collection.component';

// Checkout
import { CheckoutComponent } from './checkout/checkout.component';
import { ScrollPositionGuard } from '../../shared/guard/scroll.guard';
import { NoAuthGuard } from 'src/app/core/guard/noAuth.guard';

const routes: Routes = [
    {
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthGuard, ScrollPositionGuard],
    },
    {
        path: 'wishlist',
        component: WishlistComponent,
        canActivate: [AuthGuard, ScrollPositionGuard],
    },
    {
        path: 'compare',
        component: CompareComponent,
        canActivate: [AuthGuard, ScrollPositionGuard],
    },
    {
        path: 'product/:slug',
        component: ProductComponent,
        resolve: {
            data: ProductResolver
        },
        canActivate: [AuthGuard, ScrollPositionGuard],
    },
    {
        path: 'collections',
        component: CollectionComponent,
        canActivate: [AuthGuard, ScrollPositionGuard],
    },
    {
        path: 'seller/become-seller',
        canActivate: [NoAuthGuard],
        component: SellerComponent
    },
    {
        path: 'seller/stores',
        canActivate: [NoAuthGuard],
        component: SellerStoreComponent
    },
    {
        path: 'seller/store/:slug',
        canActivate: [NoAuthGuard],
        component: SellerDetailsComponent,
        resolve: {
            data: StoreResolver
        }
    },
    {
        path: 'checkout',
        canActivate: [AuthGuard],
        component: CheckoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule { }
