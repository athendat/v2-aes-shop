import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { Params } from "../interface/core.interface";
import { AttributeModel } from "../interface/attribute.interface";

@Injectable({
  providedIn: "root",
})
export class AttributeService {
  private http = inject(HttpClient);


  public skeletonLoader: boolean = false;
  public offCanvasMenu: boolean = false;

  getAttributes(payload?: Params): Observable<AttributeModel> {
    return this.http.get<AttributeModel>(`/attribute.json`, { params: payload });
  }

}
