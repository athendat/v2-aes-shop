import { Routes } from '@angular/router';

// Guards
import { ScrollPositionGuard } from '../../shared/guard/scroll.guard';

// Resolvers
import { ProductResolver } from '../../shared/resolvers/product.resolver';
import { StoreResolver } from '../../shared/resolvers/store.resolver';

export default [
    {
        path: 'cart',
        loadComponent: () => import('./cart/cart.component').then(c => c.CartComponent),
        canActivate: [ScrollPositionGuard],
    },
    {
        path: 'wishlist',
        loadComponent: () => import('./wishlist/wishlist.component').then(c => c.WishlistComponent),
        canActivate: [ScrollPositionGuard],
    },
    {
        path: 'compare',
        loadComponent: () => import('./compare/compare.component').then(c => c.CompareComponent),
        canActivate: [ScrollPositionGuard],
    },
    {
        path: 'product/:slug',
        loadComponent: () => import('./product/product.component').then(c => c.ProductComponent),
        resolve: {
            data: ProductResolver
        },
        canActivate: [ScrollPositionGuard],
    },
    {
        path: 'collections',
        loadComponent: () => import('./collection/collection.component').then(c => c.CollectionComponent),
        canActivate: [ScrollPositionGuard],
    },
    {
        path: 'seller/become-seller',
        loadComponent: () => import('./seller/seller.component').then(c => c.SellerComponent),
    },
    {
        path: 'seller/stores',
        loadComponent: () => import('./seller/seller-store/seller-store.component').then(c => c.SellerStoreComponent),
    },
    {
        path: 'seller/store/:slug',
        loadComponent: () => import('./seller/seller-details/seller-details.component').then(c => c.SellerDetailsComponent),
        resolve: {
            data: StoreResolver
        }
    },
    {
        path: 'checkout',
        loadComponent: () => import('./checkout/checkout.component').then(c => c.CheckoutComponent),
    }
] as Routes;


