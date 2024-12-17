import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountUser } from '../../../../interface/account.interface';
import { AccountState } from '../../../../state/account.state';
import { AuthState } from '../../../../state/auth.state';

import { ConfirmationModalComponent } from '../../../widgets/modal/confirmation-modal/confirmation-modal.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AuthStore } from 'src/app/shared/store/auth.store';


@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MyAccountComponent {

    @Input() style: string = 'basic';

    @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<string>;
    @Select(AccountState.user) user$: Observable<AccountUser>;

    @ViewChild("confirmationModal") ConfirmationModal: ConfirmationModalComponent;

    // Public Properties
    authStore = inject(AuthStore);

    // Private Properties
    #authService = inject(AuthService);
    #destroyRef = inject(DestroyRef);
    #notificationService = inject(NotificationService);
    #router = inject(Router);


    // -----------------------------------------------------------------------------------------------------
    // @ Public Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Cerrar sesión
     */
    logout() {

        this.#authService.signOut()
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe({
                next: (response) => {

                    // Mostrar notificación
                    this.#notificationService.showSuccess(response.message);

                    // Navegar a la página de inicio
                    this.#router.navigateByUrl('/home');
                },
                error: (e: HttpErrorResponse) => {

                    // Mostrar notificación de error
                    this.#notificationService.showError(e.error.message);
                }
            });

    }

}
