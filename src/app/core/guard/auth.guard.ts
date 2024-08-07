import { Injectable, inject, } from '@angular/core';
import { Store } from '@ngxs/store';
import { UrlTree, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GetUserDetails } from './../../shared/action/account.action';
import { AuthService } from './../../shared/services/auth.service';
import { AuthStore } from 'src/app/shared/store/auth.store';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    // Private Properties
    #authService = inject(AuthService);
    #authStore = inject(AuthStore);
    #router = inject(Router);
    #store = inject(Store);

    // -----------------------------------------------------------------------------------------------------
    // @ Public Methods
    // -----------------------------------------------------------------------------------------------------

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        // Store the attempted URL for redirecting after login
        this.#authService.redirectUrl = state.url;

        // Redirect to the login page
        if (!(this.#authStore.isAuthenticated() && this.#authService.access_token_033)) {
            return this.#router.createUrlTree(['/auth/login']);
        }

        this.#authService.signInUsingToken()
            .subscribe({
                complete: () => {
                    return true
                }
            });

        return true
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if (!!(this.#authStore.isAuthenticated() && this.#authService.access_token_033)) {
            this.#router.navigate(['/home']);
            return false;
        }
        return true;
    }

}
