import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, ProductModel } from '../interface/product.interface';
import { Params } from '../interface/core.interface';
import { RestResponse } from '../types';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    public skeletonLoader: boolean = false;


    #http = inject(HttpClient);

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getProducts(payload?: Params): Observable<ProductModel> {
        return this.#http.get<ProductModel>(`${environment.URL}/product.json`, { params: payload });
    }

    findProductsByIds(ids: string[]): Observable<RestResponse<Product[]>> {
        return this.#http.get<RestResponse<Product[]>>(`${environment.API_URL}/products/ids`, {
            params: {
                ids: ids.join(',')
            }
        });

    }
}
