import { Component, Input, SimpleChange, inject } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Params } from '../../../../shared/interface/core.interface';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { ThemeOptionState } from '../../../../shared/state/theme-option.state';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';
import { BannerComponent } from '../widgets/banner/banner.component';

@Component({
    selector: 'app-collection-no-sidebar',
    templateUrl: './collection-no-sidebar.component.html',
    styleUrls: ['./collection-no-sidebar.component.scss'],
    imports: [BannerComponent, CollectionProductsComponent]
})
export class CollectionNoSidebarComponent {
  attributeService = inject(AttributeService);


  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;

  @Input() filter: Params;

  public bannerImageUrl: string;

  constructor() {
    this.themeOptions$.subscribe(res => this.bannerImageUrl = res?.collection?.collection_banner_image_url)
  }

}
