import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, Observable, of } from "rxjs";

import { CartModel } from "../interface/cart.interface";

@Injectable({
    providedIn: "root",
})
export class CartService {
    private http = inject(HttpClient);


    // getCartItems(): Observable<CartModel> {
    //     return this.http.get<CartModel>(`/cart.json`);
    // }


    getCartItems(): Observable<CartModel> {
        // return this.http.get<CartModel>(`${environment.URL}/cart.json`);

        // Si el usuario no está autenticado, no se puede obtener el carrito
        // if (!this.#authStore.isAuthenticated()) {
            return of({
                items: [],
                total: 0,
            });
        // }

        // console.log('logged');

        return this.http.get<any>(`/cart/shop`)
            .pipe(
                map(({ data }) => {

                    return {
                        items: data!.cart!,
                        total: 0,
                    };

                })
            );
    }




    // /**
    //  * Agregar item al carrito
    //  *
    //  * @param product
    //  * @param quantity
    //  */
    // addItemToCart(product: Product, quantity: number = 1) {


    //     // Armar carrito
    //     const cart: Cart = {
    //         consumer_id: this.#store.consumer_id(),
    //         items: this.#store.cartItems(),
    //     }

    //     // Si el item ya existe en el carrito
    //     if (cart.items.length) {


    //         // Buscar si el producto ya está en el carrito
    //         const index = cart.items.findIndex(item => item.product_id === product.id);

    //         // Si el producto ya está en el carrito, incrementa su cantidad
    //         if (index !== -1) {

    //             // Aumenta la cantidad del producto
    //             cart.items[index].quantity += quantity;

    //             // Actualiza items del carrito en el store
    //             this.#store.updateItems(cart.items);

    //         } else {

    //             // Definir el nuevo item a añadir al carrito
    //             const cartItem: CartItem = { product_id: product.id, product, quantity, price: product.sale_price };

    //             // Añadir el nuevo item al carrito y actualizar el estado
    //             this.#store.updateItems([...cart.items, cartItem]);
    //         }


    //     } else {

    //         // Agregar item al carrito
    //         this.#store.updateItems([{ product_id: product.id, product, quantity, price: product.sale_price }]);
    //     }

    //     // Guardar carrito en redis
    //     this.saveCart(cart).subscribe();

    // }


    // /**
    //  * Actualizar la cantidad de un producto en el carrito
    //  *
    //  * @param product_id
    //  * @param quantity
    //  */
    // updateItemQuantity(product_id: string, quantity: number) {

    //     // Obtiene el estado actual de los productos en el carrito
    //     const cartItems = this.#store.cartItems();

    //     // Buscar si el producto ya está en el carrito
    //     const index = cartItems.findIndex(item => item.product_id === product_id);

    //     // Actualiza la cantidad del producto
    //     cartItems[index].quantity += quantity;

    //     // Si la cantidad es 0, elimina el producto del carrito
    //     if (cartItems[index].quantity === 0) {
    //         this.removeItemFromCart(product_id);
    //         return;
    //     }

    //     // Actualiza el estado del carrito
    //     this.#store.updateItems(cartItems);

    //     // Guardar el carrito en redis
    //     this.saveCart(
    //         { consumer_id: this.#store.consumer_id(), items: this.#store.cartItems() }
    //     ).subscribe();
    // }

    // /**
    //  * Eliminar un producto del carrito
    //  *
    //  * @param product_id
    //  */
    // removeItemFromCart(product_id: string) {

    //     // Elimina el producto del carrito
    //     const cartItems = this.#store.cartItems().filter(item => item.product_id !== product_id);

    //     // Actualiza el estado del carrito
    //     this.#store.updateItems(cartItems);

    //     // Guardar el carrito en redis
    //     this.saveCart(
    //         { consumer_id: this.#store.consumer_id(), items: this.#store.cartItems() }
    //     ).subscribe();
    // }

    // /**
    //  * Limpiar carrito
    //  */
    // clearCart() {

    //     // Actualiza el estado del carrito
    //     this.#store.updateItems([]);

    //     // Guardar el carrito en redis
    //     this.saveCart(
    //         { consumer_id: this.#store.consumer_id(), items: this.#store.cartItems() }
    //     ).subscribe();
    // }


    // /**
    //  * Crear carrito
    //  */
    // createCart(cart: Cart): Observable<RestResponse<Cart>> {
    //     return this.http.post<RestResponse<Cart>>(`/cart`, cart);
    // }


    // /**
    //  * Obtener carrito
    //  */
    // findCart(): Observable<RestResponse<Cart>> {
    //     return this.http.get<RestResponse<Cart>>(`/cart`).pipe(
    //         tap(response => {
    //             this.#store.loadCart(response.data!);
    //         })
    //     );
    // }


    // /**
    //  * Guardar carrito
    //  */
    // saveCart(cart: Cart): Observable<RestResponse<Cart>> {
    //     return this.http.patch<RestResponse<Cart>>(`/cart`, cart);
    // }

}
