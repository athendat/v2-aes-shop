import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Point } from "../interface/point.interface";
import { Params } from "../interface/core.interface";

@Injectable({
  providedIn: "root",
})
export class PointService {
  private http = inject(HttpClient);


  getUserTransaction(payload?: Params): Observable<Point> {
    return this.http.get<Point>(`${environment.URL}/point.json`, { params: payload });
  }

}
