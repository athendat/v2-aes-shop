// Angular Modules
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Third's Modules
import { Observable } from 'rxjs';

// Types
import { RestResponse, RequestParams } from '../types';
import { Params } from '../interface/core.interface';
import { PaymentMethod, PaymentMethodModel } from '../interface/payment-method.interface';

// Environment
import { environment } from 'src/environments/environment';


/**
 * PaymentMethod Service
 */
@Injectable({
    providedIn: 'root'
})
export class PaymentMethodService {

    // Private properties
    #http = inject(HttpClient);

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getPaymentMethods(payload?: Params): Observable<PaymentMethodModel> {
        const params = {
            page: payload?.['page'] || 1,
            size: payload?.['paginate'] || 10,
            sort: payload?.['field'] || 'name',
            order: payload?.['sort'] || 'desc',
            search: payload?.['search'] || '',
        };

        return this.#http.get<PaymentMethodModel>(`${environment.API_URL}/payment-methods`, { params });
    }

}

