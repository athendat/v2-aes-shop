import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { Country } from "../interface/country.interface";

@Injectable({
  providedIn: "root",
})
export class CountryService {
  private http = inject(HttpClient);


  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`/countries`);
  }

}
