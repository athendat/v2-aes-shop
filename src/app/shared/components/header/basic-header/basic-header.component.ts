import { Component, Input, HostListener, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Option } from '../../../interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';
import { DealComponent } from '../widgets/deal/deal.component';
import { MenuComponent } from '../../widgets/menu/menu.component';
import { ButtonComponent } from '../../widgets/button/button.component';
import { CategoriesBlockComponent } from '../widgets/categories/categories.component';
import { MyAccountComponent } from '../widgets/my-account/my-account.component';
import { CartComponent } from '../widgets/cart/cart.component';
import { WishlistComponent } from '../widgets/wishlist/wishlist.component';
import { CallComponent } from '../widgets/call/call.component';
import { SearchBoxComponent } from '../widgets/search-box/search-box.component';
import { SearchComponent } from '../widgets/search/search.component';
import { CategoriesComponent } from '../../widgets/categories/categories.component';
import { LogoComponent } from '../widgets/logo/logo.component';
import { NavbarMenuButtonComponent } from '../widgets/navbar-menu-button/navbar-menu-button.component';
import { TopbarComponent } from '../widgets/topbar/topbar.component';

@Component({
    selector: 'app-basic-header',
    templateUrl: './basic-header.component.html',
    styleUrls: ['./basic-header.component.scss'],
    imports: [TopbarComponent, NavbarMenuButtonComponent, LogoComponent,
        CategoriesComponent, SearchComponent, SearchBoxComponent, CallComponent,
        WishlistComponent, CartComponent, MyAccountComponent, CategoriesBlockComponent,
        ButtonComponent, MenuComponent, DealComponent, TranslateModule]
})
export class BasicHeaderComponent {


    @Input() data: Option | null;
    @Input() logo: string | null | undefined;
    @Input() sticky: boolean | number | undefined; // Default false

    public stick: boolean = false;
    public active: boolean = false;
    private platformId = inject<Object>(PLATFORM_ID);


    // @HostListener Decorator
    @HostListener("window:scroll", [])
    onWindowScroll() {
        if (isPlatformBrowser(this.platformId)) { // For SSR
            let number = window.screenY || document.documentElement.scrollTop || document.body.scrollTop || 0;
            if (number >= 150 && window.innerWidth > 400) {
                this.stick = true;
            } else {
                this.stick = false;
            }
        }
    }

    toggle(val: boolean) {
        this.active = val;
    }
}
