import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { States } from "../interface/state.interface";

@Injectable({
  providedIn: "root",
})
export class StateService {
  private http = inject(HttpClient);


  getStates(): Observable<States[]> {
    return this.http.get<States[]>(`${environment.URL}/state.json`);
  }

}
