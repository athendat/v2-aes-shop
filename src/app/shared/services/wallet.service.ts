import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Wallet } from "../interface/wallet.interface";

@Injectable({
  providedIn: "root",
})
export class WalletService {
  private http = inject(HttpClient);


  getUserTransaction(payload?: Params): Observable<Wallet> {
    return this.http.get<Wallet>(`${environment.URL}/wallet.json`, { params: payload });
  }

}
