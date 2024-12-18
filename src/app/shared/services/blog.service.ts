import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, of } from "rxjs";

import { BlogModel } from "../interface/blog.interface";
import { Params } from "../interface/core.interface";

@Injectable({
  providedIn: "root",
})
export class BlogService {
  private http = inject(HttpClient);


  public skeletonLoader: boolean = false;

  getBlogs(payload?: Params): Observable<BlogModel> {
    // return this.http.get<BlogModel>(`/blog.json`, { params: payload });
    return of({
        data: [],
        total: 0
    })
  }

}
