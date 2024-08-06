// Angular Imports
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

// Third-party Imports
import { CookieService } from "ngx-cookie-service";
import { Observable, throwError, tap, of } from "rxjs";

// Shared Imports
import { AuthStore } from "../store/auth.store";
import { AuthUtils } from "../utils/auth.utils";
import { SignUpFormData, AuthResponse, SignInForm } from "../types/auth.types";

// Environment Imports
import { environment } from "src/environments/environment";

// API URL
const API_URL = environment.API_URL;

@Injectable({
    providedIn: "root",
})
export class AuthService {

    // Public properties
    redirectUrl: string | undefined;

    // Private properties
    #authStore = inject(AuthStore);
    #httpClient = inject(HttpClient);
    // #socketService = inject(SocketService);
    #cookieService = inject(CookieService);


    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Obtiene el token de acceso
     */
    getToken(): string | null {
        return this.#cookieService.get('access_token_033') || null;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     *
     * @param signUpFormData
     */
    signUp(signUpFormData: Partial<SignUpFormData>): Observable<AuthResponse> {
        return this.#httpClient.post<AuthResponse>(`${API_URL}/auth/sign-up`, signUpFormData, { params: { type: 'consumer' } });
    }

    /**
    * Confirma la cuenta
    *
    * @param code
    */
    confirmAccount(code: string): Observable<AuthResponse> {

        // Lanza un error si el usuario ya ha iniciado sesión
        if (this.#authStore.isAuthenticated()) {
            return throwError(() => 'El usuario ya ha iniciado sesión.');
        }

        // Confirma la cuenta
        return this.#httpClient.post<AuthResponse>(`${API_URL}/auth/users/confirm`, { code })
            .pipe(
                tap(({ user }) => {

                    // Actualiza el estado de autenticación
                    this.#authStore.setAuthenticated(true, user);

                })
            );
    }

    /**
     * Recuperar contraseña
     *
     * @param email
     */
    forgotPassword(email: string): Observable<AuthResponse> {
        return this.#httpClient.post<AuthResponse>(`${API_URL}/auth/users/forgot-password/`, { email });
    }

    /**
     * Reiniciar contraseña
     *
     * @param pwd
     * @param code
     */
    resetPassword(pwd: string, code: string): Observable<AuthResponse> {
        return this.#httpClient.post<AuthResponse>(`${API_URL}/auth/users/recover-password`, { pwd, code });
    }

    /**
     * Iniciar sesión
     *
     * @param credentials
     */
    signIn(credentials: SignInForm): Observable<any> {

        // Lanza un error si el usuario ya ha iniciado sesión
        if (this.#authStore.isAuthenticated()) {
            return throwError(() => 'El usuario ya ha iniciado sesión.');
        }

        // Inicia sesión
        return this.#httpClient.post<AuthResponse>(`${API_URL}/auth/sign-in`, credentials, { withCredentials: true }).pipe(
            tap(({ user }) => {

                // Actualiza el estado de autenticación
                this.#authStore.setAuthenticated(true, user);

            })
        );
    }

    /**
     * Iniciar sesión usando el token
     */
    signInUsingToken(): Observable<any> {

        // Renovar el token de acceso
        return this.#httpClient.get<AuthResponse>(`${API_URL}/auth/refresh-access-token`).pipe(
            tap(({ user }) => {

                // Si no hay usuario, no hacer nada
                if (!user) {
                    return of(false);
                }

                // Actualiza el estado de autenticación
                this.#authStore.setAuthenticated(true, user);

                // TODO: Abrir la conexión del socket

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Cerrar sesión
     */
    signOut(): Observable<any> {

        // Cierra la sesión
        return this.#httpClient.get(`${API_URL}/auth/users/sign-out`).pipe(
            tap(() => {

                // Limpiar la autenticación
                this.#authStore.clearAuthentication();

            })
        );
    }

    /**
     * Comprobar la autenticación
     */
    check(): Observable<boolean> {

        // Comprueba si el usuario ya ha iniciado sesión
        if (this.#authStore.isAuthenticated()) {

            // TODO: Abrir la conexión del socket
            // this._socketService.setToken(this.SA_TOKEN);

            return of(true);
        }

        // Sino existe el token de acceso en las cookies
        if (!this.getToken()) {

            // Limpiar la autenticación
            this.#authStore.clearAuthentication();

            // Return false
            return of(false);
        }


        // Si el token de acceso ha expirado
        if (AuthUtils.isTokenExpired(this.getToken()!)) {
            return of(false);
        }

        // Si el token de acceso no ha expirado, renovarlo
        return this.signInUsingToken();
    }
}
