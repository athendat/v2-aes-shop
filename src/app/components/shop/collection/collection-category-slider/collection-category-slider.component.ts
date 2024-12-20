import { Component, Input, inject } from '@angular/core';
import { Params } from '../../../../shared/interface/core.interface';
import * as data from  '../../../../shared/data/owl-carousel';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';
import { CollectionSidebarComponent } from '../widgets/sidebar/sidebar.component';
import { CollectionCategoriesComponent } from '../widgets/collection-categories/collection-categories.component';

@Component({
    selector: 'app-collection-category-slider',
    templateUrl: './collection-category-slider.component.html',
    styleUrls: ['./collection-category-slider.component.scss'],
    imports: [CollectionCategoriesComponent, CollectionSidebarComponent, CollectionProductsComponent]
})
export class CollectionCategorySliderComponent {
  attributeService = inject(AttributeService);


  @Input() filter: Params;

  public categorySlider = data.categorySlider;

}
