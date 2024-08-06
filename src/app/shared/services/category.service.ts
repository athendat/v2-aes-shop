import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { CategoryModel } from "../interface/category.interface";
import { CategoriesData, CategoryType, RestResponse } from "../types";

@Injectable({
    providedIn: "root",
})
export class CategoryService {


    #http = inject(HttpClient);

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getCategories(payload?: Params): Observable<CategoryModel> {
        // return this.#http.get<CategoryModel>(`${environment.URL}/category.json`, { params: payload });

        // Preparar query params
        const params = {
            type: CategoryType.product.toString(),
        };

        return this.#http.get<any>(`${environment.API_URL}/categories`, { params })
            .pipe(
                map(({ data }) => {

                    return {
                        data: data!.categories!,
                        total: data!.categories?.length || 0,
                    };

                })
            );
    }

}
