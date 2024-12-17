import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { VerifyEmailOtp } from '../../../shared/action/auth.action';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class OtpComponent {

    public form: FormGroup;
    public email: string;
    public breadcrumb: Breadcrumb = {
        title: "Confirmar Cuenta",
        items: [
            { label: 'Autenticación', active: false },
            { label: 'Confirmar Cuenta', active: true },
        ]
    }

    // Private Properties
    #authService = inject(AuthService);
    #notificationService = inject(NotificationService);
    #router = inject(Router);
    #destroyRef = inject(DestroyRef);


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On Init
     */
    ngOnInit(): void {
        this.form = new FormGroup({
            otp: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
        });
    }

    submit() {
        this.form.markAllAsTouched();
        if (this.form.valid) {

            // Verificar cuenta
            this.#authService.confirmAccount(this.form.get('otp')?.value)
                .pipe(takeUntilDestroyed(this.#destroyRef))
                .subscribe({
                    next: (response) => {

                        // Navegar al dashboard
                        this.#router.navigateByUrl('/home');

                        // Mostrar mensaje de confirmación
                        this.#notificationService.showSuccess(response.message);

                    },
                    error: (e: HttpErrorResponse) => {

                        // Construir mensaje de error
                        console.warn(e.error.message);

                        // Mostrar mensaje de error
                        this.#notificationService.showError(e.error.message.message);

                    }
                });
        }
    }

}

