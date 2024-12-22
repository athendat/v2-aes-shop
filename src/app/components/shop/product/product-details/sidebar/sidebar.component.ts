import { Component, input } from '@angular/core';

import { select } from '@ngxs/store';

import { ThemeOptionState } from '../../../../../shared/state/theme-option.state';

import { ProductBannerComponent } from '../widgets/product-banner/product-banner.component';
import { TrendingProductsComponent } from '../widgets/trending-products/trending-products.component';
import { StoreInformationComponent } from '../widgets/store-information/store-information.component';

import { Product } from '../../../../../shared/interface/product.interface';


@Component({
    selector: 'app-product-details-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [StoreInformationComponent, TrendingProductsComponent, ProductBannerComponent]
})
export class ProductSidebarComponent {


    option = select(ThemeOptionState.themeOptions);
    product = input<Product>();

}
