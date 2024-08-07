// Angular Modules
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, model } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// Services
import { AuthService } from '../../../shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

// Types
import { Breadcrumb } from '../../../shared/interface/breadcrumb';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

    // Public Properties
    breadcrumb: Breadcrumb = {
        title: "Iniciar Sesión",
        items: [
            { label: 'Autenticación', active: false },
            { label: 'Iniciar Sesión', active: true },
        ]
    };
    form: FormGroup;
    rememberMe = model(false);


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
            email: new FormControl('fr20587@gmail.com', [Validators.required, Validators.email]),
            password: new FormControl('P@ssw0rd', [Validators.required]),
        });


        // Si estamos en el navegador, intentar obtener el email del usuario
        if (typeof window !== 'undefined') {

            const email = localStorage.getItem('fk_email') || null;

            // Si se ha encontrado un email, establecerlo en el formulario
            if (email) {
                this.form.get('email')?.setValue(email);
                this.toggleRememberMe();
            }
        }

        this.#authService.getToken()
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Cambiar estado de recordar usuario
     */
    toggleRememberMe() {
        this.rememberMe.set(!this.rememberMe());
    }

    /**
     * Submit
     */
    submit() {

        // Marcar todos los campos como tocados
        this.form.markAllAsTouched();

        // Guardar usuario si se cumple la validación
        if (this.rememberMe()) {
            localStorage.setItem('fk_email', this.form.get('email')?.value);
        }

        if (this.form.valid) {

            // Crear usuario
            this.#authService.signIn(this.form.getRawValue())
                .pipe(takeUntilDestroyed(this.#destroyRef))
                .subscribe({
                    next: (response) => {

                        // Navigate to the intended URL after successful login
                        const redirectUrl = '/account/dashboard';

                        // Mostrar mensaje de confirmación
                        this.#notificationService.showSuccess(response.message);

                        // Clear the stored redirect URL
                        this.#authService.redirectUrl = undefined;

                        // Navegar al dashboard
                        this.#router.navigateByUrl(redirectUrl);

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
