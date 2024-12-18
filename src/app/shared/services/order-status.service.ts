import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OrderStatusModel } from '../interface/order-status.interface';
import { Params } from '../interface/core.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {
  private http = inject(HttpClient);


  getOrderStatus(payload?: Params): Observable<OrderStatusModel> {
    return this.http.get<OrderStatusModel>(`/order-status.json`, { params: payload });
  }

}
