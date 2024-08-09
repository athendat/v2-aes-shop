import { inject } from "@angular/core";
import { signalStore, withState, withMethods, patchState } from "@ngrx/signals";
import { AuthService } from "../services/auth.service";
import { User } from "../interface/user.interface";
// import { User } from "../types/user.types";

/**
 * Modelo de estado para la autenticación
 */
export class AuthStoreModel {
    loading: boolean;
    isAuthenticated: boolean;
    user: User | null;
}

/**
 * Estado inicial para la autenticación
 */
const initialState: AuthStoreModel = {
    loading: false,
    isAuthenticated: false,
    user: null
};

/**
 * Store para la autenticación
 */
export const AuthStore = signalStore(

    { providedIn: 'root' },

    withState(initialState),

    withMethods((store) => ({

        // Establecer autenticación
        setAuthenticated(isAuthenticated: boolean, user: User | null): void {
            patchState(store, { isAuthenticated, user });
        },

        // Borrar autenticación
        clearAuthentication(): void {
            patchState(store, { isAuthenticated: false, user: null });
        },

        // Actualiza usuario
        updateUser(user: User): void {
            patchState(store, { user });
        }

    })),
)
