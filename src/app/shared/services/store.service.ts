import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Params } from "../interface/core.interface";
import { environment } from "../../../environments/environment";
import { StoresModel } from "../interface/store.interface";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  private http = inject(HttpClient);


  public skeletonLoader: boolean = false;

  getStores(payload?: Params): Observable<StoresModel> {
    return this.http.get<StoresModel>(`${environment.URL}/store.json`, { params: payload });
  }

}
