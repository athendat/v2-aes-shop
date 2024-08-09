import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CheckoutPayload, Order, OrderModel } from '../interface/order.interface';
import { Params } from '../interface/core.interface';
import { RestResponse } from '../types';
import { AuthStore } from '../store/auth.store';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    public skeletonLoader: boolean = false;

    // Private properties
    #authStore = inject(AuthStore);
    #http = inject(HttpClient);

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /**
     * Crear Orden
     *
     * @param payload
     */
    createOrder(payload: CheckoutPayload): Observable<RestResponse<Order>> {
        return this.#http.post<RestResponse<Order>>(`${environment.API_URL}/orders`, { ...payload, consumer_id: this.#authStore.user()!.id });
    }

    getOrders(payload?: Params): Observable<OrderModel> {
        // return this.#http.get<OrderModel>(`${environment.URL}/order.json`, { params: payload });

        // Convertir parámetros de la plantilla a parámetros de la API
        const params = {
            page: payload!['page'].toString() || '',
            size: payload!['paginate'].toString() || '',
            sort: 'order_number',
            order: 'desc',
            search: '',
        };

        return this.#http.get<RestResponse<Order[]>>(`${environment.API_URL}/orders`, { params }).
            pipe(
                map((response) => {
                    return {
                        data: response.data!,
                        total: response.data!.length,
                    }
                })
            );
    }

    findOrderByNumber(order_number: number): Observable<Order> {
        return this.#http.get<RestResponse<Order>>(`${environment.API_URL}/orders/no/${order_number}`).pipe(
            map(response => response.data!)
        );
    }



}
