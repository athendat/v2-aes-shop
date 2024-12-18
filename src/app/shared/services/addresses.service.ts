// Angular Modules
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Third's Modules
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


import { UserAddress } from '../interface/user.interface';
import { RestResponse } from '../types/common.types';


/**
 * Addresses Service
 */
@Injectable({
    providedIn: 'root'
})
export class AddressesService {

    // Private properties
    #http = inject(HttpClient);

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Crear dirección
     */
    createAddress(address: UserAddress): Observable<RestResponse<UserAddress>> {

        return this.#http.post<RestResponse<UserAddress>>(`/addresses`,
            { ...address,  }
        );
    }



}

