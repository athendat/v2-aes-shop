// Angular Imports
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

// Third-party Imports
import { CookieService } from "ngx-cookie-service";
import { SsrCookieService } from "ngx-cookie-service-ssr";
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
    // #cookieService = inject(CookieService);
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

    /**
     * Setter & getter for access token
     */
    get access_token_033(): string {
        return localStorage.getItem('access_token_033') ?? '';
    }

    set access_token_033(token: string) {
        localStorage.setItem('access_token_033', token);
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
        return this.#httpClient.post<AuthResponse>(`${API_URL}/auth/confirm`, { code })
            .pipe(
                tap(({ user, token }) => {

                    // Actualiza el estado de autenticación
                    this.#authStore.setAuthenticated(true, user);

                    // Store the access token in the local storage
                    this.access_token_033 = token;

                })
            );
    }

    /**
     * Recuperar contraseña
     *
     * @param email
     */
    forgotPassword(email: string): Observable<AuthResponse> {
        return this.#httpClient.post<AuthResponse>(`${API_URL}/auth/forgot-password/`, { email });
    }

    /**
     * Reiniciar contraseña
     *
     * @param pwd
     * @param code
     */
    resetPassword(pwd: string, code: string): Observable<AuthResponse> {
        return this.#httpClient.post<AuthResponse>(`${API_URL}/auth/recover-password`, { pwd, code });
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
        return this.#httpClient.post<AuthResponse>(`${API_URL}/auth/sign-in`, credentials).pipe(
            tap(({ user, token }) => {

                // Actualiza el estado de autenticación
                this.#authStore.setAuthenticated(true, user);

                // Store the access token in the local storage
                this.access_token_033 = token;

            })
        );
    }

    /**
     * Iniciar sesión usando el token
     */
    signInUsingToken(): Observable<any> {

        // Renovar el token de acceso
        return this.#httpClient.get<AuthResponse>(`${API_URL}/auth/refresh-access-token`).pipe(
            tap(({ user, token }) => {

                // Si no hay usuario, no hacer nada
                if (!user) {
                    return of(false);
                }

                // Actualiza el estado de autenticación
                this.#authStore.setAuthenticated(true, user);

                // Store the access token in the local storage
                this.access_token_033 = token;

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

        // Remove the access token from the local storage
        localStorage.removeItem('access_token_033');

        // Cierra la sesión
        return this.#httpClient.get(`${API_URL}/auth/sign-out`).pipe(
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
        // if (!this.getToken()) {
        if (!this.access_token_033) {

            // Remove the access token from the local storage
            localStorage.removeItem('access_token_033');

            // Limpiar la autenticación
            this.#authStore.clearAuthentication();

            // Return false
            return of(false);
        }


        // Si el token de acceso ha expirado
        // if (AuthUtils.isTokenExpired(this.getToken()!)) {
        if (AuthUtils.isTokenExpired(this.access_token_033)) {
            return of(false);
        }

        // Si el token de acceso no ha expirado, renovarlo
        return this.signInUsingToken();
    }
}
