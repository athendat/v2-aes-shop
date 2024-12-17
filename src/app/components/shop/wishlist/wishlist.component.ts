import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetWishlist } from './../../../shared/action/wishlist.action';
import { WishlistState } from '../../../shared/state/wishlist.state';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { WishlistModel } from '../../../shared/interface/wishlist.interface';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { ProductBoxComponent } from '../../../shared/components/widgets/product-box/product-box.component';
import { SkeletonProductBoxComponent } from '../../../shared/components/widgets/product-box/skeleton-product-box/skeleton-product-box.component';
import { AsyncPipe } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss'],
    standalone: true,
    imports: [BreadcrumbComponent, SkeletonProductBoxComponent, ProductBoxComponent, NoDataComponent, AsyncPipe]
})
export class WishlistComponent {
  private store = inject(Store);
  wishlistService = inject(WishlistService);


  @Select(WishlistState.wishlistItems) wishlistItems$: Observable<WishlistModel>;

  public breadcrumb: Breadcrumb = {
    title: "Wishlist",
    items: [{ label: 'Wishlist', active: true }]
  }

  public skeletonItems = Array.from({ length: 12 }, (_, index) => index);

  constructor(){
    this.store.dispatch(new GetWishlist())
  }
}
