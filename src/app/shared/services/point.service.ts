import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { Point } from "../interface/point.interface";
import { Params } from "../interface/core.interface";

@Injectable({
  providedIn: "root",
})
export class PointService {
  private http = inject(HttpClient);


  getUserTransaction(payload?: Params): Observable<Point> {
    return this.http.get<Point>(`/point.json`, { params: payload });
  }

}
