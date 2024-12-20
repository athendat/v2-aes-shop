import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { CurrencyPipe, provideCloudinaryLoader } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { provideStore } from '@ngxs/store';
import { provideToastr } from 'ngx-toastr';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';

import { ErrorService } from './shared/services/error.service';
import { NotificationService } from './shared/services/notification.service';

import { apiUrlInterceptor } from './core/interceptors/api-url.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { GlobalErrorHandlerInterceptor } from './core/interceptors/global-error-handler.interceptor';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { ServerInterceptor } from './core/interceptors/server.interceptor';

import { GlobalErrorHandler } from './core/error/global-error-handler';

import { AccountState } from './shared/state/account.state';
import { AttributeState } from './shared/state/attribute.state';
import { AuthState } from './shared/state/auth.state';
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

import { routes } from './app.routes';

import { environment } from 'public/environments/environment';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export const appConfig: ApplicationConfig = {
    providers: [
        CurrencyPipe,
        ErrorService,
        NotificationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GlobalErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ServerInterceptor,
            multi: true,
        },
        importProvidersFrom(
            LoadingBarRouterModule,
        ),
        provideTranslateService({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            defaultLanguage: 'es',
        }),
        provideRouter(routes,
            withComponentInputBinding(),
            withInMemoryScrolling({
                scrollPositionRestoration: 'enabled',
            }),
            withViewTransitions()
        ),
        provideCloudinaryLoader(environment.IMAGE_PROVIDER_URL),
        provideStore(
            [
                AccountState,
                AttributeState,
                AuthState,
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
            ],
            withNgxsStoragePlugin({
                keys: [
                    'auth',
                    'account',
                    'country',
                    'state',
                    'cart',
                    'theme',
                    'theme_option',
                    'setting',
                    'notification'
                ]
            })
        ),
        provideAnimationsAsync(),
        provideHttpClient(
            withInterceptorsFromDi(),
            withFetch(),
            withInterceptors([
                apiUrlInterceptor
            ])
        ),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideClientHydration(withEventReplay()),
        provideToastr({
            positionClass: 'toast-top-center',
            preventDuplicates: true
        }),
    ]
};

