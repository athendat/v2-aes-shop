import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { CurrencyModel } from "../interface/currency.interface";

@Injectable({
  providedIn: "root",
})
export class CurrencyService {
  private http = inject(HttpClient);


  getCurrencies(payload?: Params): Observable<CurrencyModel> {
    return this.http.get<CurrencyModel>(`${environment.URL}/currency.json`, { params: payload });
  }

}
