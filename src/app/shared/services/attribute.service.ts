import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Attribute, AttributeModel } from "../interface/attribute.interface";
import { RestResponse } from "../types";

@Injectable({
    providedIn: "root",
})
export class AttributeService {

    public skeletonLoader: boolean = false;
    public offCanvasMenu: boolean = false;

    #http = inject(HttpClient);

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    getAttributes(payload?: Params): Observable<AttributeModel> {
        // return this.http.get<AttributeModel>(`${environment.URL}/attribute.json`, { params: payload });

        // Crear parámetros de la petición
        const params = {
            page: 1,
            size: 5,
            sort: 'name',
            order: 'asc',
            search: '',
            status: true,
        }


        return this.#http.get<RestResponse<Attribute[]>>(`${environment.API_URL}/attributes`, { params })
            .pipe(
                map((response) => {
                    return {
                        data: response.data!,
                        total: response.data?.length || 0,
                    };
                })
            );
    }

}
