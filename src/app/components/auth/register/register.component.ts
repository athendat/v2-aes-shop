// Angular Modules
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Store } from '@ngxs/store';

// Services
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { CustomValidators } from '../../../shared/validator/password-match';

import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import * as data from '../../../shared/data/country-code';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

    // Public Properties
    form: FormGroup;
    breadcrumb: Breadcrumb = {
        title: "Autenticación",
        items: [{ label: 'Crear Cuenta', active: true }]
    }
    codes = data.countryCodes;
    tnc = new FormControl(false, [Validators.requiredTrue]);

    // Private Properties
    #authService = inject(AuthService);
    #notificationService = inject(NotificationService);
    #router = inject(Router);
    #store = inject(Store);
    #destroyRef = inject(DestroyRef);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    get passwordMatchError() {
        return (
            this.form.getError('mismatch') &&
            this.form.get('password_confirmation')?.touched
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On Init
     */
    ngOnInit() {

        this.form = new FormGroup({
            name: new FormControl('Frank Rodríguez López', [Validators.required]),
            email: new FormControl('fr20587@gmail.com', [Validators.required, Validators.email]),
            phone: new FormControl('52541322', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
            country_code: new FormControl('53', [Validators.required]),
            password: new FormControl('P@ssw0rd', [Validators.required]),
            password_confirmation: new FormControl('P@ssw0rd', [Validators.required]),
        }, { validators: CustomValidators.MatchValidator('password', 'password_confirmation') });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Submit     *
     *
     * @returns
     */
    submit() {


        this.form.markAllAsTouched();
        if (this.tnc.invalid) {
            return
        }
        if (this.form.valid) {

            // Crear usuario
            this.#authService.signUp(this.form.getRawValue())
                .pipe(takeUntilDestroyed(this.#destroyRef))
                .subscribe({
                    next: (response) => {

                        // Navegar al dashboard
                        this.#router.navigateByUrl('/auth/otp');

                        // Mostrar mensaje de confirmación
                        this.#notificationService.showSuccess(response.message);

                    },
                    error: (e: HttpErrorResponse) => {

                        // Construir mensaje de error
                        console.warn(e.error.message);

                        // Mostrar mensaje de error
                        this.#notificationService.showError(e.error.message.message);

                    },
                    complete: () => console.info('complete')
                });



        }
    }
}
