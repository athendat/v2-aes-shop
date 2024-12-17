import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller, AsyncPipe } from '@angular/common';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductModel } from '../../../../../shared/interface/product.interface';
import { Params } from '../../../../../shared/interface/core.interface';
import { ProductState } from '../../../../../shared/state/product.state';
import { PaginationComponent } from '../../../../../shared/components/widgets/pagination/pagination.component';

@Component({
    selector: 'app-collection-paginate',
    templateUrl: './collection-paginate.component.html',
    styleUrls: ['./collection-paginate.component.scss'],
    standalone: true,
    imports: [PaginationComponent, AsyncPipe]
})
export class CollectionPaginateComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private viewScroller = inject(ViewportScroller);


  @Select(ProductState.product) product$: Observable<ProductModel>;

  @Input() filter: Params;

  public totalItems: number = 0;

  constructor() {
    this.product$.subscribe(product => this.totalItems = product?.total);
  }

  setPaginate(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: page
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      // this.viewScroller.setOffset([100, 100]);
      // this.viewScroller.scrollToAnchor('filtered_products'); // Anchor Link
    });
  }

}
