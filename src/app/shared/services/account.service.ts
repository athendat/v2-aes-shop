import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { AccountUser } from "../interface/account.interface";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private http = inject(HttpClient);


  getUserDetails(): Observable<AccountUser> {
    return this.http.get<AccountUser>(`/users/account`);
  }

}
