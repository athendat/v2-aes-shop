import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, Observable } from "rxjs";

import { Params } from "../interface/core.interface";
import { CategoryModel } from "../interface/category.interface";
import { RestResponse } from '../types/common.types';

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private http = inject(HttpClient);


  getCategories(payload?: Params): Observable<CategoryModel> {
    // return this.http.get<CategoryModel>(`/category.json`, { params: payload });
    const params = {
        type: 'product',
    };

    return this.http.get<RestResponse<any>>(`/categories`, { params })
        .pipe(
            map(({ data }) => {
                return {
                    data: data!,
                    total: data?.length || 0,
                };
            })
        );
  }

}
