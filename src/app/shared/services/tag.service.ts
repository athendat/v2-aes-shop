import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { Params } from "../interface/core.interface";
import { TagModel } from "../interface/tag.interface";

@Injectable({
  providedIn: "root",
})
export class TagService {
  private http = inject(HttpClient);


  getTags(payload?: Params): Observable<TagModel> {
    return this.http.get<TagModel>(`/tag.json`, { params: payload });
  }

}
