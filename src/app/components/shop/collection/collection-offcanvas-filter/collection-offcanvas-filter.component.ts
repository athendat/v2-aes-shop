import { Component, Input, inject } from '@angular/core';
import { Params } from '../../../../shared/interface/core.interface';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';
import { CollectionSidebarComponent } from '../widgets/sidebar/sidebar.component';

@Component({
    selector: 'app-collection-offcanvas-filter',
    templateUrl: './collection-offcanvas-filter.component.html',
    styleUrls: ['./collection-offcanvas-filter.component.scss'],
    imports: [CollectionSidebarComponent, CollectionProductsComponent]
})
export class CollectionOffCanvasFilterComponent {
  attributeService = inject(AttributeService);


  @Input() filter: Params;

  closeCanvasMenu() {
    this.attributeService.offCanvasMenu = false;
  }

}
