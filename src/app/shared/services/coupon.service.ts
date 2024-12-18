import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { CouponModel } from '../interface/coupon.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private http = inject(HttpClient);


  public skeletonLoader: boolean = false;

  getCoupons(payload?: Params): Observable<CouponModel> {
    return this.http.get<CouponModel>(`/coupon.json`, { params: payload });
  }

}
