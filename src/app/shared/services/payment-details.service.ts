import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../public/environments/environment';
import { PaymentDetails } from '../interface/payment-details.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {
  private http = inject(HttpClient);


  getPaymentAccount(): Observable<PaymentDetails> {
    return this.http.get<PaymentDetails>(`/payment-account.json`);
  }

}
