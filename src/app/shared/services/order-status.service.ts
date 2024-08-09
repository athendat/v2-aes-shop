import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OrderStatus, OrderStatusModel } from '../interface/order-status.interface';
import { Params } from '../interface/core.interface';

@Injectable({
    providedIn: 'root'
})
export class OrderStatusService {

    // Private properties
    #http = inject(HttpClient);

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getOrderStatus(payload?: Params): Observable<OrderStatusModel> {
        // return this.#http.get<OrderStatusModel>(`${environment.URL}/order-status.json`, { params: payload });

        return this.#http.get<OrderStatus[]>(`${environment.API_URL}/order-status`)
            .pipe(
                map((response) => {
                    return {
                        data: response,
                        total: response.length,
                    }
                })
            );
    }

}
