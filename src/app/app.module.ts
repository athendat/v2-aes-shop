import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { CookieService } from 'ngx-cookie-service';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { ToastrModule } from 'ngx-toastr';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

// Component
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';

// State
import { AccountState } from './shared/state/account.state';
import { AttributeState } from './shared/state/attribute.state';
import { BlogState } from './shared/state/blog.state';
import { CartState } from './shared/state/cart.state';
import { CategoryState } from './shared/state/category.state';
import { CompareState } from './shared/state/compare.state';
import { CountryState } from './shared/state/country.state';
import { CouponState } from './shared/state/coupon.state';
import { CurrencyState } from './shared/state/currency.state';
import { LoaderState } from './shared/state/loader.state';
import { NotificationState } from './shared/state/notification.state';
import { OrderState } from './shared/state/order.state';
import { OrderStatusState } from './shared/state/order-status.state';
import { PageState } from './shared/state/page.state';
import { PaymentDetailsState } from './shared/state/payment-details.state';
import { PaymentMethodState } from './shared/state/payment-method.state';
import { PointState } from './shared/state/point.state';
import { ProductState } from './shared/state/product.state';
import { QuestionAnswersState } from './shared/state/questions-answers.state';
import { RefundState } from './shared/state/refund.state';
import { ReviewState } from './shared/state/review.state';
import { SettingState } from './shared/state/setting.state';
import { StateState } from './shared/state/state.state';
import { StoreState } from './shared/state/store.state';
import { TagState } from './shared/state/tag.state';
import { ThemeOptionState } from './shared/state/theme-option.state';
import { ThemeState } from './shared/state/theme.state';
import { WalletState } from './shared/state/wallet.state';
import { WishlistState } from './shared/state/wishlist.state';



// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        MaintenanceComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxsModule.forRoot([
            AccountState,
            AttributeState,
            BlogState,
            CartState,
            CategoryState,
            CompareState,
            CountryState,
            CouponState,
            CurrencyState,
            LoaderState,
            NotificationState,
            OrderState,
            OrderStatusState,
            PageState,
            PaymentDetailsState,
            PaymentMethodState,
            PointState,
            ProductState,
            QuestionAnswersState,
            RefundState,
            ReviewState,
            SettingState,
            StateState,
            StoreState,
            TagState,
            ThemeOptionState,
            ThemeState,
            WalletState,
            WishlistState,
        ]),
        NgxsStoragePluginModule.forRoot({
            keys: [
                'account',
                'auth',
                'cart',
                'country',
                'notification',
                'setting',
                'state',
                'theme_option',
                'theme',
            ]
        }),
        ToastrModule.forRoot({
            positionClass: 'toast-top-center',
            preventDuplicates: true
        }),
        SharedModule,
        CoreModule,
        LoadingBarRouterModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [
        provideAnimationsAsync(),
        provideHttpClient(
            withFetch(),
            withInterceptorsFromDi()
        ),
        // provideClientHydration(),
        CookieService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
