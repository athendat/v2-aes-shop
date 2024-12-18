import { Component, Input, inject } from '@angular/core';
import { Select } from '@ngxs/store';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { ProductService } from '../../../../shared/services/product.service';
import { Product, ProductModel } from '../../../../shared/interface/product.interface';
import { ProductState } from '../../../../shared/state/product.state';
import * as data from '../../../../shared/data/owl-carousel';
import { ProductBoxComponent } from '../../../../shared/components/widgets/product-box/product-box.component';
import { SkeletonProductBoxComponent } from '../../../../shared/components/widgets/product-box/skeleton-product-box/skeleton-product-box.component';
import { CommonModule, NgClass } from '@angular/common';

@Component({
    selector: 'app-theme-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    imports: [SkeletonProductBoxComponent, ProductBoxComponent, CarouselModule, NgClass,CommonModule]
})
export class ProductComponent {
  productService = inject(ProductService);


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

  ngOnChanges() {
    if (Array.isArray(this.productIds)) {
      this.product$.subscribe(products => {
        this.products = products.data.filter(product => this.productIds?.includes(product?.id));
      });
    }
  }

}
