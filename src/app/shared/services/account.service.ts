import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { AccountUser } from "../interface/account.interface";
import { RestResponse } from '../types/common.types';

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private http = inject(HttpClient);


  getUserDetails(): Observable<RestResponse<AccountUser>> {
    return this.http.get<RestResponse<AccountUser>>(`/users/account`);
  }

}
