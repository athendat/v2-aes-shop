import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product, ProductModel } from '../interface/product.interface';
import { Params } from '../interface/core.interface';
import { RestResponse } from '../types/common.types';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private http = inject(HttpClient);


    public skeletonLoader: boolean = false;

    getProducts(payload?: Params): Observable<ProductModel> {
        // return this.http.get<ProductModel>(`/product.json`, { params: payload });
        // Convertir parámetros de la plantilla a parámetros de la API
        const params = {
            page: payload?.['page'] || 1,
            size: payload?.['paginate'] || 10,
            sort: payload?.['sortBy'] ?? '',
            order: payload?.['sort'] ?? '',
            category: payload?.['category'] ?? '',
            price: payload?.['price'] ?? '',
            field: payload?.['field'] ?? '',
            tag: payload?.['tag'] ?? '',
            rating: payload?.['rating'] ?? '',
            attribute: payload?.['attribute'] ?? '',
        };

        return this.http.get<RestResponse<Product[]>>(`/products/filters`, { params }).
            pipe(
                map((response) => {

                    this.skeletonLoader = false;

                    return {
                        data: response.data!,
                        total: response.data!.length,
                    }
                })
            );
    }

    findProductBySlug(slug: string): Observable<ProductModel> {
        return this.http.get<RestResponse<Product>>(`/products/slug/${slug}`).pipe(
            map((response) => {
                return {
                    data: [response.data!],
                    total: 1,
                }
            })
        );
    }

    findProductsByIds(ids: string[]): Observable<RestResponse<Product[]>> {
        return this.http.get<RestResponse<Product[]>>(`/products/ids`, {
            params: {
                ids: ids.join(',')
            }
        });

    }

    findProductsByFilters(payload?: Params): Observable<ProductModel> {

        this.skeletonLoader = true;

        // Convertir parámetros de la plantilla a parámetros de la API
        const params = {
            page: payload?.['page'] || 1,
            size: payload?.['paginate'] || 10,
            sort: payload?.['sortBy'] ?? '',
            order: payload?.['sort'] ?? '',
            category: payload?.['category'] ?? '',
            price: payload?.['price'] ?? '',
            field: payload?.['field'] ?? '',
            tag: payload?.['tag'] ?? '',
            rating: payload?.['rating'] ?? '',
            attribute: payload?.['attribute'] ?? '',
        };

        return this.http.get<RestResponse<Product[]>>(`/products/filters`, { params }).
            pipe(
                map((response) => {

                    this.skeletonLoader = false;

                    return {
                        data: response.data!,
                        total: response.data!.length,
                    }
                })
            );
    }

}
