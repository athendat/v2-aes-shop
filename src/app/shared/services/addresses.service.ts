// Angular Modules
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Third's Modules
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


// Environment
import { environment } from 'src/environments/environment';
import { RestResponse } from '../types';
import { AuthStore } from '../store/auth.store';
import { UserAddress } from '../interface/user.interface';


/**
 * Addresses Service
 */
@Injectable({
    providedIn: 'root'
})
export class AddressesService {

    // Private properties
    #http = inject(HttpClient);
    #authStore = inject(AuthStore);

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Crear dirección
     */
    createAddress(address: UserAddress): Observable<RestResponse<UserAddress>> {

        return this.#http.post<RestResponse<UserAddress>>(`${environment.API_URL}/addresses`,
            { ...address, user_id: this.#authStore.user()!.id }
        ).pipe(
            tap(({ data }) => {

                // Obtener usuario seleccionado del store
                const user = structuredClone(this.#authStore.user()!);

                // Agregar dirección al listado de direcciones del usuario si tiene la propiedad address
                if (!user.address) {
                    user.address = [];
                }

                // Agregar dirección al listado de direcciones del usuario
                if (data !== undefined) { user.address.push(data) };

                // Actualizar el usuario en el store
                this.#authStore.updateUser(user);

            })

        );
    }



}

