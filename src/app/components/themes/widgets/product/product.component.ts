import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Input, OnChanges, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Select } from '@ngxs/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { ProductService } from '../../../../shared/services/product.service';
import { Product, ProductModel } from '../../../../shared/interface/product.interface';
import { ProductState } from '../../../../shared/state/product.state';
import * as data from '../../../../shared/data/owl-carousel';
// import { Product } from 'src/app/shared/types';

@Component({
    selector: 'app-theme-product',
    templateUrl: './product.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ProductComponent implements OnChanges {

    @Input() style: string = 'vertical';
    @Input() productIds: string[] = [];
    @Input() boxClass: string;
    @Input() productStyle: string = "product-modern";
    @Input() layout: string;
    @Input() sliderOption: OwlOptions = data.productSlider;
    @Input() slider: boolean;
    @Input() showItem: number;

    public products: Product[] = [];

    public skeletonItems = Array.from({ length: 6 }, (_, index) => index);

    @Select(ProductState.product) product$: Observable<ProductModel>;

    productService = inject(ProductService);
    #destroyRef = inject(DestroyRef);
    #changeDetectorRef = inject(ChangeDetectorRef);

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On Change
     */
    ngOnChanges() {
        if (Array.isArray(this.productIds)) {
            // this.product$.subscribe(products => {
            //     this.products = products.data.filter(product => this.productIds?.includes(product?.id));
            // });

            // Convertir ids a string
            const productIds = this.productIds.map(String);

            this.productService.findProductsByIds(productIds)
                .pipe(takeUntilDestroyed(this.#destroyRef))
                .subscribe(response => {

                    // Guardar los productos en la variable products
                    this.products = response.data!;

                    // Desactivar el skeleton loader
                    this.productService.skeletonLoader = false;

                    // Marcar para comprobar
                    this.#changeDetectorRef.markForCheck();
                });
        }
    }

}
