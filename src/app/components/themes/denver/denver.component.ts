import { Component, Input, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { Store  } from '@ngxs/store';
import { forkJoin } from 'rxjs';
import { GetProducts } from '../../../shared/action/product.action';
import { Denver } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import * as data from  '../../../shared/data/owl-carousel';
import { NewsletterComponent } from '../widgets/newsletter/newsletter.component';
import { FourColumnProductComponent } from '../widgets/four-column-product/four-column-product.component';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { ProductComponent } from '../widgets/product/product.component';
import { TitleComponent } from '../../../shared/components/widgets/title/title.component';
import { CategoriesComponent } from '../widgets/categories/categories.component';
import { HomeBannerComponent } from '../widgets/home-banner/home-banner.component';

@Component({
    selector: 'app-denver',
    templateUrl: './denver.component.html',
    styleUrls: ['./denver.component.scss'],
    imports: [HomeBannerComponent, CategoriesComponent, TitleComponent, ProductComponent, ImageLinkComponent, NgClass, FourColumnProductComponent, NewsletterComponent]
})
export class DenverComponent {
  private store = inject(Store);
  private platformId = inject<Object>(PLATFORM_ID);
  private themeOptionService = inject(ThemeOptionService);


  @Input() data?: Denver;
  @Input() slug?: string;

  public categorySlider = data.categorySlider9;
  public productSlider6Item = data.productSlider6Item;
  public productSlider6ItemMargin = data.productSlider6ItemMargin;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) { // For SSR
      if(this.data?.slug===this.slug) {
        // Get Products
        const getProducts$ = this.store.dispatch(new GetProducts({
          status: 1,
          ids: this.data?.content?.products_ids?.join(',')
        }));

        // Skeleton Loader
        document.body.classList.add('skeleton-body');

        forkJoin([getProducts$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });
      }

      // Change color for this layout
      document.documentElement.style.setProperty('--theme-color', '#417394');
      this.themeOptionService.theme_color = '#417394';
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) { // For SSR
      // Remove Color
      document.documentElement.style.removeProperty('--theme-color');
    }
  }

}
