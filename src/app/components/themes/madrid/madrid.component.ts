import { Component, Input, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Store  } from '@ngxs/store';
import { forkJoin } from 'rxjs';
import { GetProducts } from '../../../shared/action/product.action';
import { GetBlogs } from '../../../shared/action/blog.action';
import { Madrid } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import * as data from  '../../../shared/data/owl-carousel';
import { BlogComponent } from '../widgets/blog/blog.component';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { DealComponent } from '../widgets/deal/deal.component';
import { WalletOfferComponent } from '../widgets/wallet-offer/wallet-offer.component';
import { ProductComponent } from '../widgets/product/product.component';
import { CategoriesComponent } from '../widgets/categories/categories.component';
import { TitleComponent } from '../../../shared/components/widgets/title/title.component';
import { BannerComponent } from '../widgets/banner/banner.component';
import { HomeBannerComponent } from '../widgets/home-banner/home-banner.component';

@Component({
    selector: 'app-madrid',
    templateUrl: './madrid.component.html',
    styleUrls: ['./madrid.component.scss'],
    standalone: true,
    imports: [HomeBannerComponent, BannerComponent, TitleComponent, CategoriesComponent, ProductComponent, WalletOfferComponent, DealComponent, ImageLinkComponent, BlogComponent]
})
export class MadridComponent {
  private store = inject(Store);
  private platformId = inject<Object>(PLATFORM_ID);
  private themeOptionService = inject(ThemeOptionService);


  @Input() data?: Madrid;
  @Input() slug?: string;

  public categorySlider = data.categorySlider9;
  public productSlider6Item = data.productSlider6Item;
  public productSlider6ItemMargin = data.productSlider6ItemMargin;
  public customOptionsItem4 = data.customOptionsItem4;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) { // For SSR 
      if(this.data?.slug == this.slug) {
        // Get Products
        const getProducts$ = this.store.dispatch(new GetProducts({
          status: 1,
          ids: this.data?.content?.products_ids?.join(',')
        }));

        // Get Blogs
        const getBlogs$ = this.store.dispatch(new GetBlogs({
          status: 1,
          ids: this.data?.content?.featured_blogs?.blog_ids?.join(',')
        }));

        // Skeleton Loader
        document.body.classList.add('skeleton-body');

        forkJoin([getProducts$, getBlogs$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });
      }

      // Change color for this layout
      document.documentElement.style.setProperty('--theme-color', '#239698');
      this.themeOptionService.theme_color = '#239698';
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) { // For SSR 
      // Remove Color
      document.documentElement.style.removeProperty('--theme-color');
    }
  }

}
