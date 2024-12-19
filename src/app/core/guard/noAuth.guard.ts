import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';

import { of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

export const NoauthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
    const router: Router = inject(Router);

    // Check the authentication status
    return inject(AuthService).check().pipe(
        switchMap((authenticated) => {
            // Allow the access
            return of(true);
        }),
    );
};
