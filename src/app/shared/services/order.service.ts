import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../public/environments/environment';
import { OrderModel } from '../interface/order.interface';
import { Params } from '../interface/core.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);


  public skeletonLoader: boolean = false;

  getOrders(payload?: Params): Observable<OrderModel> {
    return this.http.get<OrderModel>(`/order.json`, { params: payload });
  }

}
