import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
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

    findProductBySlug(slug: string): Observable<ProductModel> {
        return this.#http.get<RestResponse<Product>>(`${environment.API_URL}/products/slug/${slug}`).pipe(
            map((response) => {
                return {
                    data: [response.data!],
                    total: 1,
                }
            })
        );
    }

    findProductsByIds(ids: string[]): Observable<RestResponse<Product[]>> {
        return this.#http.get<RestResponse<Product[]>>(`${environment.API_URL}/products/ids`, {
            params: {
                ids: ids.join(',')
            }
        });

    }

    findProductsByFilters(payload?: Params): Observable<ProductModel> {

        // Convertir parámetros de la plantilla a parámetros de la API
        const params = {
            page: payload!['page'].toString() || '',
            size: payload!['paginate'].toString() || '',
            sort: payload!['sortBy'] || '',
            order: payload!['sort'] || '',
            category: payload!['category'] || '',
            price: payload!['price'].toString() || '',
            field: payload!['field'] || '',
            tag: payload!['tag'] || '',
            rating: payload!['rating'].toString() || '',
            attribute: payload!['attribute'] || '',
        };

        return this.#http.get<RestResponse<Product[]>>(`${environment.API_URL}/products/filters`, { params }).
            pipe(
                map((response) => {
                    return {
                        data: response.data!,
                        total: response.data!.length,
                    }
                })
            );
    }
}
