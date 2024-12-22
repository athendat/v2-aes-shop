import { Component, input, Input } from '@angular/core';
import { select, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../../../shared/interface/product.interface';
import { ProductState } from '../../../../../../shared/state/product.state';
import { ProductBoxComponent } from '../../../../../../shared/components/widgets/product-box/product-box.component';
import { TitleComponent } from '../../../../../../shared/components/widgets/title/title.component';


@Component({
    selector: 'app-related-products',
    templateUrl: './related-products.component.html',
    styleUrls: ['./related-products.component.scss'],
    imports: [TitleComponent, ProductBoxComponent]
})
export class RelatedProductsComponent {


    product = input<Product | null>();
    relatedProducts = select(ProductState.relatedProducts);


    // ngOnChanges() {
    //     if (this.product()?.related_products && Array.isArray(this.product()?.related_products)) {
    //         this.relatedProduct$.subscribe(products => {
    //             this.relatedProducts = products.filter(product => this.product()?.related_products_ids?.includes(product?.id));
    //         });
    //     }
    // }

}
