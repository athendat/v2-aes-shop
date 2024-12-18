import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeOptionState } from '../../../../../shared/state/theme-option.state';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { Product } from '../../../../../shared/interface/product.interface';
import { ProductBannerComponent } from '../widgets/product-banner/product-banner.component';
import { TrendingProductsComponent } from '../widgets/trending-products/trending-products.component';
import { StoreInformationComponent } from '../widgets/store-information/store-information.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-product-details-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [StoreInformationComponent, TrendingProductsComponent, ProductBannerComponent, AsyncPipe]
})
export class ProductSidebarComponent {

  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;

  @Input() product: Product;

}
