import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { Params } from "../interface/core.interface";
import { Wallet } from "../interface/wallet.interface";

@Injectable({
  providedIn: "root",
})
export class WalletService {
  private http = inject(HttpClient);


  getUserTransaction(payload?: Params): Observable<Wallet> {

    const params = {
        page: payload?.['page'] || 1,
        size: payload?.['paginate'] || 10,
        sort: payload?.['sortBy'] ?? 'createdAt',
        order: payload?.['sort'] ?? 'desc',
    };
    return this.http.get<Wallet>(`/transactions/user`, { params });
  }

}
