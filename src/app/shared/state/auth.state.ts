import { Injectable, inject } from "@angular/core";
import { Store, State, Selector, Action, StateContext } from "@ngxs/store";
import { Router } from '@angular/router';
import { AccountClear, GetUserDetails, UpdateUserDetails } from "../action/account.action";
import { Register, Login, ForgotPassWord, VerifyEmailOtp, UpdatePassword, Logout, AuthClear } from "../action/auth.action";
import { NotificationService } from "../services/notification.service";
import { AuthService } from "../services/auth.service";
import { tap } from "rxjs";
import { subscribe } from "diagnostics_channel";

export interface AuthStateModel {
    email: String;
    token: String | Number;
    access_token: String | null;
}

@State<AuthStateModel>({
    name: "auth",
    defaults: {
        email: '',
        token: '',
        access_token: ''
    },
})
@Injectable()
export class AuthState {
    router = inject(Router);

    private store = inject(Store);
    private notificationService = inject(NotificationService);
    #authService = inject(AuthService);


    // ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    //     // Pre Fake Login (if you are using ap
    //     ctx.patchState({
    //         email: 'john.customer@example.com',
    //         token: '',
    //         access_token: '115|laravel_sanctum_mp1jyyMyKeE4qVsD1bKrnSycnmInkFXXIrxKv49w49d2a2c5'
    //     })
    // }

    @Selector()
    static accessToken(state: AuthStateModel): String | null {
        return state.access_token;
    }

    @Selector()
    static isAuthenticated(state: AuthStateModel): Boolean {
        return !!state.access_token;
    }

    @Selector()
    static email(state: AuthStateModel): String {
        return state.email;
    }

    @Selector()
    static token(state: AuthStateModel): String | Number {
        return state.token;
    }

    @Action(Register)
    register(ctx: StateContext<AuthStateModel>, action: Register) {
        // Register Logic Here
        this.#authService.register(action.payload).subscribe({
            next: result => {

                console.log({ result });

                ctx.patchState({
                    email: result.email,
                    access_token: result.token,
                });

                // Mostrar notificación
                this.notificationService.showSuccess(result.message);
            },
            complete: () => {

            },
            error: err => {
                throw new Error(err?.message);
            }
        });

    }

    @Action(Login)
    login(ctx: StateContext<AuthStateModel>, action: Login) {

        console.log({ action });

        // Si el usuario ya está autenticado, no se puede iniciar sesión
        if (this.store.selectSnapshot(AuthState.isAuthenticated)) {
            this.notificationService.showWarning('Ya has iniciado sesión');
            return;
        }

        // Login Logic Here
        this.#authService.login(action.payload).subscribe({
            next: result => {
                console.log({ result });

                // Actualizar el estado de autenticación
                ctx.patchState({
                    email: action.payload.email,
                    access_token: result.token,
                });

                // Actualizar los detalles del usuario en AccountState
                this.store.dispatch(new UpdateUserDetails({
                    user: result.user,
                    permissions: result.user.role.permissions,
                }));

                // Mostrar notificación
                this.notificationService.showSuccess(result.message);
            },
            error: err => {
                throw new Error(err?.error?.message);
            }
        });
    }

    @Action(ForgotPassWord)
    forgotPassword(ctx: StateContext<AuthStateModel>, action: ForgotPassWord) {
        // Forgot Password Logic Here

    }

    @Action(VerifyEmailOtp)
    verifyEmail(ctx: StateContext<AuthStateModel>, action: VerifyEmailOtp) {
        // Verify Logic Here
        this.#authService.confirmAccount(action.payload.token).subscribe({
            next: result => {
                console.log({ result });

                // Actualizar el estado de autenticación
                ctx.patchState({
                    email: action.payload.email,
                    access_token: result.token,
                });

                // Mostrar notificación
                this.notificationService.showSuccess(result.message);
            },
            error: err => {
                throw new Error(err?.error?.message);
            }
        });
    }

    @Action(UpdatePassword)
    updatePassword(ctx: StateContext<AuthStateModel>, action: UpdatePassword) {
        // Update Password Logic Here
    }

    @Action(Logout)
    logout(ctx: StateContext<AuthStateModel>) {
        // Logout LOgic Here
        ctx.patchState({
            email: '',
            token: '',
            access_token: null,
        });
        this.store.dispatch(new AccountClear());
    }

    @Action(AuthClear)
    authClear(ctx: StateContext<AuthStateModel>) {
        ctx.patchState({
            email: '',
            token: '',
            access_token: null,
        });
        this.store.dispatch(new AccountClear());
    }

}
