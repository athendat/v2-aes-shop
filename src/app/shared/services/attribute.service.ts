import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, Observable } from "rxjs";

import { Params } from "../interface/core.interface";
import { Attribute, AttributeModel } from "../interface/attribute.interface";
import { RestResponse } from "../types/common.types";

@Injectable({
    providedIn: "root",
})
export class AttributeService {
    private http = inject(HttpClient);


    public skeletonLoader: boolean = false;
    public offCanvasMenu: boolean = false;

    getAttributes(payload?: Params): Observable<AttributeModel> {

        const params = {
            page: 1,
            size: 50,
        }

        return this.http.get<RestResponse<Attribute[]>>(`/attributes`, { params }).pipe(
            map((res) => {
                return {
                    data: res.data!,
                    total: res.data!.length || 0,
                };
            })
        );
    }
}
