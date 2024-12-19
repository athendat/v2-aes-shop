import { Injectable, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { UrlTree, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, CanActivateChildFn } from '@angular/router';
import { Observable } from 'rxjs';
import { GetUserDetails } from './../../shared/action/account.action';
import { AuthService } from './../../shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

// @Injectable({
//     providedIn: 'root'
// })
// export class authGuard {
//     private store = inject(Store);
//     private router = inject(Router);
//     private authService = inject(AuthService);
//     #notificationService = inject(NotificationService);


//     canActivate(route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

//         // Store the attempted URL for redirecting after login
//         this.authService.redirectUrl = state.url;

//         // Redirect to the login page
//         if (!this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {

//             // Show a message before redirecting
//             this.#notificationService.showInfo('Please login to continue');

//             return this.router.createUrlTree(['/auth/login']);
//         }

//         this.store.dispatch(new GetUserDetails()).subscribe({
//             complete: () => {
//                 return true
//             }
//         });
//         return true
//     }

//     canActivateChild(route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot): boolean | UrlTree {
//         if (!!this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
//             if (this.router.url.startsWith('/account') || this.router.url === '/checkout' || this.router.url === '/compare')
//                 this.router.navigate(['/home']);
//             return false;
//         }
//         return true;
//     }

// }

export const authGuard: CanActivateFn | CanActivateChildFn = (route, state) => {

    const store = inject(Store);
    const router = inject(Router);
    const authService = inject(AuthService);
    const notificationService = inject(NotificationService);

    // Store the attempted URL for redirecting after login
    authService.redirectUrl = state.url;

    // Redirect to the login page
    if (!store.selectSnapshot(state => state.auth && state.auth.access_token)) {

        // Show a message before redirecting
        notificationService.showInfo('Please login to continue');

        return router.createUrlTree(['/auth/login']);
    }

    if (!!store.selectSnapshot(state => state.auth && state.auth.access_token)) {
        if (router.url.startsWith('/account') || router.url === '/checkout' || router.url === '/compare' || router.url === '/wishlist')
            router.navigate(['/home']);
        return false;
    }

    store.dispatch(new GetUserDetails()).subscribe({
        complete: () => {
            return true
        }
    });
    return true
};
