import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { CartModel } from "../interface/cart.interface";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private http = inject(HttpClient);


  getCartItems(): Observable<CartModel> {
    return this.http.get<CartModel>(`${environment.URL}/cart.json`);
  }

}
