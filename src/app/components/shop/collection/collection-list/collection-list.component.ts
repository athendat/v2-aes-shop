import { Component, Input, inject } from '@angular/core';
import { Params } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { ThemeOptionState } from '../../../../shared/state/theme-option.state';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';
import { CollectionSidebarComponent } from '../widgets/sidebar/sidebar.component';
import { BannerComponent } from '../widgets/banner/banner.component';

@Component({
    selector: 'app-collection-list',
    templateUrl: './collection-list.component.html',
    styleUrls: ['./collection-list.component.scss'],
    standalone: true,
    imports: [BannerComponent, CollectionSidebarComponent, CollectionProductsComponent]
})
export class CollectionListComponent {
  attributeService = inject(AttributeService);


  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;

  @Input() filter: Params;

  public bannerImageUrl: string;

  constructor() {
    this.themeOptions$.subscribe(res => this.bannerImageUrl = res?.collection?.collection_banner_image_url)
  }
}
