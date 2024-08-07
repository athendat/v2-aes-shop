import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UpdatePassword } from '../../../shared/action/auth.action';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdatePasswordComponent implements OnInit {

    form: FormGroup;
    code = input('code');
    breadcrumb: Breadcrumb = {
        title: "Actualizar de Contraseña",
        items: [
            { label: 'Autenticación', active: false },
            { label: 'Actualizar de Contraseña', active: true },
        ]
    }

    // Private Properties
    #authService = inject(AuthService);
    #destroyRef = inject(DestroyRef);
    #notificationService = inject(NotificationService);
    #router = inject(Router);



    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On Init
     */
    ngOnInit() {

        // Inicializar formulario
        this.form = new FormGroup({
            newPassword: new FormControl('P@ssw0rd', [Validators.required]),
            confirmPassword: new FormControl('P@ssw0rd', [Validators.required]),
        });
    }

    submit() {
        this.form.markAllAsTouched();
        if (this.form.valid) {

            this.#authService.resetPassword(this.form.get('newPassword')?.value, this.code())
                .pipe(takeUntilDestroyed(this.#destroyRef))
                .subscribe({
                    next: (response) => {

                        // Mostrar mensaje de confirmación
                        this.#notificationService.showSuccess(response.message);

                        // Navegar al dashboard
                        // this.#router.navigateByUrl(redirectUrl);
                        this.#router.navigateByUrl('/auth/login');

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
