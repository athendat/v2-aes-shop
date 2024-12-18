import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { Params } from "../interface/core.interface";
import { ContactUsModel } from "../interface/page.interface";

@Injectable({
  providedIn: "root",
})
export class PageService {
  private http = inject(HttpClient);


  public skeletonLoader: boolean = false;

  getFaqs(): Observable<any> {
    return this.http.get(`/faq.json`);
  }

}
