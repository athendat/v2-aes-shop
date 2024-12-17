import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Router } from "@angular/router";
import { ForgotPassWord } from "../../../shared/action/auth.action";
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { AuthService } from "src/app/shared/services/auth.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: "app-forgot-password",
    templateUrl: "./forgot-password.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ForgotPasswordComponent implements OnInit {

    // Public Properties
    breadcrumb: Breadcrumb = {
        title: "Olvido de Contraseña",
        items: [
            { label: 'Autenticación', active: false },
            { label: 'Olvido de Contraseña', active: true },
        ]
    };
    form: FormGroup;

    // Private Properties
    #authService = inject(AuthService);
    #destroyRef = inject(DestroyRef);
    #notificationService = inject(NotificationService);


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On Init
     */
    ngOnInit() {

        // Inicializar formulario
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Enviar formulario
     */
    submit() {

        // Marcar todos los campos como tocados
        this.form.markAllAsTouched();

        // Verificar si el formulario es válido
        if (this.form.valid) {

            this.#authService.forgotPassword(this.form.get('email')?.value)
                .pipe(takeUntilDestroyed(this.#destroyRef))
                .subscribe({
                    next: (response) => {

                        // Mostrar mensaje de confirmación
                        this.#notificationService.showSuccess(response.message);

                        // Navegar al dashboard
                        // this.#router.navigateByUrl(redirectUrl);

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
