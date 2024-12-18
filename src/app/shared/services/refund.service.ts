import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Params } from '../interface/core.interface';
import { RefundModel } from '../interface/refund.interface';

@Injectable({
  providedIn: 'root'
})
export class RefundService {
  private http = inject(HttpClient);


  getRefunds(payload?: Params): Observable<RefundModel> {
    return this.http.get<RefundModel>(`/refund.json`, { params: payload });
  }

}
