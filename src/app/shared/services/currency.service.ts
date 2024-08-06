import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Currency, CurrencyModel } from "../interface/currency.interface";
import {  RestResponse } from "../types";

@Injectable({
    providedIn: "root",
})
export class CurrencyService {

    #http = inject(HttpClient);

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getCurrencies(payload?: Params): Observable<CurrencyModel> {
        // return this.http.get<CurrencyModel>(`${environment.URL}/currency.json`, { params: payload });

        // Crear parámetros de la petición
        const params = {
            page: 1,
            size: 5,
            sort: 'name',
            order: 'asc',
            search: '',
            status: true,
        }


        return this.#http.get<RestResponse<Currency[]>>(`${environment.API_URL}/currencies`, { params })
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

