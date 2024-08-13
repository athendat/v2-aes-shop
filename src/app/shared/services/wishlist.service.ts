import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WishlistModel } from '../interface/wishlist.interface';
import { RestResponse } from '../types';
import { Product } from '../interface/product.interface';

@Injectable({
    providedIn: 'root'
})
export class WishlistService {

    public skeletonLoader: boolean = false;

    #http = inject(HttpClient);

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    getWishlistItems(): Observable<WishlistModel> {
        return this.#http.get<RestResponse<Product[]>>(`${environment.API_URL}/wishlist`).pipe(
            map((response) => {

                this.skeletonLoader = false;

                return {
                    data: response.data!,
                    total: response.data!.length,
                }
            })
        );
    }

    addWishlistItem(product_id: string): Observable<RestResponse<Product>> {
        return this.#http.post<RestResponse<Product>>(`${environment.API_URL}/wishlist/${product_id}`, {});
    }

    removeWishlistItem(product_id: string): Observable<RestResponse<Product>> {
        return this.#http.delete<RestResponse<Product>>(`${environment.API_URL}/wishlist/${product_id}`);
    }

}
