import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, Observable } from "rxjs";

import { Params } from "../interface/core.interface";
import { Currency, CurrencyModel } from "../interface/currency.interface";
import { RestResponse } from "../types/common.types";

@Injectable({
  providedIn: "root",
})
export class CurrencyService {
  private http = inject(HttpClient);


  getCurrencies(payload?: Params): Observable<CurrencyModel> {
    // return this.http.get<CurrencyModel>(`/currency.json`, { params: payload });
    // Crear parámetros de la petición
    const params = {
        page: 1,
        size: 5,
        sort: 'name',
        order: 'asc',
        search: '',
        status: true,
    }


    return this.http.get<RestResponse<Currency[]>>(`/currencies`, { params })
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
