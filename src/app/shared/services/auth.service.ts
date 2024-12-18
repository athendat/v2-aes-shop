// Angular Imports
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

// Third-party Imports
import { CookieService } from "ngx-cookie-service";
import { SsrCookieService } from "ngx-cookie-service-ssr";
import { Observable, throwError, tap, of } from "rxjs";

// Shared Imports


// Environment Imports
import { environment } from "src/environments/environment";
import { AuthUserStateModel, RegisterModal } from "../interface/auth.interface";

// API URL
const API_URL = environment.API_URL;

@Injectable({
    providedIn: "root",
})
export class AuthService {

    // Public properties
    redirectUrl: string | undefined;

    // Private properties
    #httpClient = inject(HttpClient);
    // #socketService = inject(SocketService);
    // #cookieService = inject(CookieService);
    #cookieService = inject(CookieService);


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     *
     * @param signUpFormData
     */
    register(register: RegisterModal): Observable<any> {
        return this.#httpClient.post<any>(`/auth/sign-up`, register, { params: { type: 'consumer' } });
    }

    /**
    * Confirma la cuenta
    *
    * @param code
    */
    confirmAccount(code: string): Observable<any> {

        // Confirma la cuenta
        return this.#httpClient.post<any>(`/auth/confirm`, { code })
    }

    /**
     * Recuperar contraseña
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this.#httpClient.post<any>(`/auth/forgot-password/`, { email });
    }

    /**
     * Reiniciar contraseña
     *
     * @param pwd
     * @param code
     */
    resetPassword(pwd: string, code: string): Observable<any> {
        return this.#httpClient.post<any>(`/auth/recover-password`, { pwd, code });
    }

    /**
     * Iniciar sesión
     *
     * @param credentials
     */
    login(credentials: AuthUserStateModel): Observable<any> {

        // Inicia sesión
        return this.#httpClient.post<any>(`/auth/sign-in`, credentials);
    }

    /**
     * Cerrar sesión
     */
    signOut(): Observable<any> {
        return this.#httpClient.get(`/auth/sign-out`);
    }


}
