import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, AsyncPipe } from '@angular/common';
import { Store, Select } from '@ngxs/store';
import { Observable, forkJoin } from 'rxjs';
import { ThemeOptionState } from '../shared/state/theme-option.state';
import { Option } from '../shared/interface/theme-option.interface';
import { GetCategories } from '../shared/action/category.action';
import { ThemeOptionService } from '../shared/services/theme-option.service';
import { GetBlogs } from '../shared/action/blog.action';
import { GetDealProducts } from '../shared/action/product.action';
import { GetUserDetails } from '../shared/action/account.action';
import { ExitModalComponent } from '../shared/components/widgets/modal/exit-modal/exit-modal.component';
import { CookieComponent } from '../shared/components/widgets/cookie/cookie.component';
import { NewsletterModalComponent } from '../shared/components/widgets/modal/newsletter-modal/newsletter-modal.component';
import { BackToTopComponent } from '../shared/components/widgets/back-to-top/back-to-top.component';
import { StickyCompareComponent } from '../shared/components/widgets/sticky-compare/sticky-compare.component';
import { StickyCartComponent } from '../shared/components/widgets/sticky-cart/sticky-cart.component';
import { RecentPurchasePopupComponent } from '../shared/components/widgets/recent-purchase-popup/recent-purchase-popup.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { LoaderComponent } from '../shared/components/widgets/loader/loader.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    imports: [LoadingBarModule, LoaderComponent, HeaderComponent, RouterOutlet,
        FooterComponent, RecentPurchasePopupComponent, StickyCartComponent,
        StickyCompareComponent, BackToTopComponent, NewsletterModalComponent,
        CookieComponent, ExitModalComponent, AsyncPipe]
})

export class LayoutComponent {
    private store = inject(Store);
    private platformId = inject<Object>(PLATFORM_ID);
    themeOptionService = inject(ThemeOptionService);


    @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;
    @Select(ThemeOptionState.cookies) cookies$: Observable<boolean>;
    @Select(ThemeOptionState.exit) exit$: Observable<boolean>;

    public cookies: boolean;
    public exit: boolean;
    public isBrowser: boolean;
    public isLoading: boolean = true;

    constructor() {
        this.isBrowser = isPlatformBrowser(this.platformId);
        this.cookies$.subscribe(res => this.cookies = res);
        this.exit$.subscribe(res => this.exit = res);
        this.themeOptionService.preloader = true;
        this.store.dispatch(new GetUserDetails());
        const getCategories$ = this.store.dispatch(new GetCategories({ status: 1 }));
        const getBlog$ = this.store.dispatch(new GetBlogs({ status: 1, paginate: 10 }));
        const getProduct$ = this.store.dispatch(new GetDealProducts({ status: 1, paginate: 2 }));
        forkJoin([getCategories$, getBlog$, getProduct$]).subscribe({
            complete: () => {
                this.themeOptionService.preloader = false;
            }
        });
    }

    setLogo() {

        let headerLogo = '';
        let footerLogo = '';
        let footerClass = '';

        if (this.isBrowser) { // For SSR
            // if (window.location.pathname === '/theme/paris' || window.location.pathname === '/theme/osaka') {
            //     headerLogo = 'assets/images/logo/1.png';
            //     footerLogo = 'assets/images/logo/1.png';
            // } else if (window.location.pathname === '/theme/tokyo') {
            //     headerLogo = 'assets/images/logo/2.png';
            //     footerLogo = 'assets/images/logo/2.png';
            // } else if (window.location.pathname === '/theme/rome') {
            //     headerLogo = 'assets/images/logo/3.png';
            //     footerLogo = 'assets/images/logo/3.png';
            // } else if (window.location.pathname === '/theme/madrid') {
            //     headerLogo = 'assets/images/logo/4.png';
            //     footerLogo = 'assets/images/logo/4.png'
            //     footerClass = 'footer-section-2 footer-color-2'
            // } else if (window.location.pathname === '/theme/berlin' || window.location.pathname === '/theme/denver') {
            //     headerLogo = 'assets/images/logo/6.png';
            //     footerLogo = 'assets/images/logo/4.png'
            //     footerClass = 'footer-section-2 footer-color-3'
            // } else {
                this.themeOption$.subscribe(theme => {
                    headerLogo = theme?.logo?.header_logo?.original_url;
                    footerLogo = theme?.logo?.footer_logo?.original_url;
                    footerClass = theme?.footer.footer_style === 'dark_mode' ? 'footer-section-2 footer-color-3' : '';
                });
            // }
        }
        return { header_logo: headerLogo, footer: { footer_logo: footerLogo, footer_class: footerClass } }
    }

}
