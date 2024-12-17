import { Component, Input, inject } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Params } from '../../../../shared/interface/core.interface';
import { ThemeOptionState } from '../../../../shared/state/theme-option.state';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';
import { CollectionSidebarComponent } from '../widgets/sidebar/sidebar.component';
import { BannerComponent } from '../widgets/banner/banner.component';

@Component({
    selector: 'app-collection-left-sidebar',
    templateUrl: './collection-left-sidebar.component.html',
    styleUrls: ['./collection-left-sidebar.component.scss'],
    standalone: true,
    imports: [BannerComponent, CollectionSidebarComponent, CollectionProductsComponent]
})
export class CollectionLeftSidebarComponent {
  attributeService = inject(AttributeService);


  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;

  @Input() filter: Params;

  public bannerImageUrl: string;

  constructor() {
    this.themeOptions$.subscribe(res => this.bannerImageUrl = res?.collection?.collection_banner_image_url)
  }

}
