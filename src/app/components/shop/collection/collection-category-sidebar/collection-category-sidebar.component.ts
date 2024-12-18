import { Component, Input, inject } from '@angular/core';
import { Params } from '../../../../shared/interface/core.interface';
import * as data from  '../../../../shared/data/owl-carousel';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';
import { CollectionCategoriesComponent } from '../widgets/collection-categories/collection-categories.component';

@Component({
    selector: 'app-collection-category-sidebar',
    templateUrl: './collection-category-sidebar.component.html',
    styleUrls: ['./collection-category-sidebar.component.scss'],
    imports: [CollectionCategoriesComponent, CollectionProductsComponent]
})
export class CollectionCategorySidebarComponent {
  attributeService = inject(AttributeService);


  @Input() filter: Params;

  public categorySlider = data.categorySlider;

}
