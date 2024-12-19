import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { RestResponse } from '../types/common.types';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private http = inject(HttpClient);


  public skeletonLoader: boolean = false;

  getWishlistItems(): Observable<RestResponse<Product[]>> {
    return this.http.get<RestResponse<Product[]>>(`/wishlist`);
  }

}
