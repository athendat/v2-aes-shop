import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, Observable } from "rxjs";
import { Params } from "../interface/core.interface";

import { Stores, StoresModel } from "../interface/store.interface";
import { RestResponse } from "../types/common.types";

@Injectable({
    providedIn: "root",
})
export class StoreService {
    private http = inject(HttpClient);


    public skeletonLoader: boolean = false;

    getStores(payload?: Params): Observable<StoresModel> {
        return this.http.get<RestResponse<Stores[]>>(`/stores`, { params: payload }).pipe(
            map((res) => {
                return {
                    data: res.data!,
                    total: res.data!.length || 0,
                };
            })
        )
    }

}
