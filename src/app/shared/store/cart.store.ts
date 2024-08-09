// Angular Modules
import { computed } from "@angular/core";

// Third's Modules
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";

// Types
import { Cart, CartItem } from "../types";


type CartStore = {
    isLoading: boolean;
    consumer_id: string;
    cartItems: CartItem[];
}

const initialState: CartStore = {
    isLoading: true,
    consumer_id: '',
    cartItems: [],
};

export const CartStore = signalStore(

    { providedIn: 'root' },

    // Estado inicial del carrito
    withState(initialState),

    // Señales personalizadas para el estado del carrito
    withComputed(({ cartItems }) => ({

        // Cantidad de items en el carrito
        items: computed(() => cartItems().length),

        // subtotal del carrito
        subtotal: computed(() => cartItems().reduce(
            (a, b) => a + (b.quantity * Number(b.product.sale_price)), 0
        ))
    })),

    // Acciones para el estado del carrito
    withMethods((store) => ({

        // Cargar carrito
        loadCart: (cart: Cart) => patchState(store, { cartItems: cart.items, isLoading: false, consumer_id: cart.consumer_id }),

        // Actualizar estado del carrito
        updateItems: (cartItems: CartItem[]) => patchState(store, { cartItems }),


        // Obtener item del carrito por id
        getItem: (product_id: string): CartItem | undefined => {

            // Buscar el producto en el carrito
            const cartItem = store.cartItems().find(item => item.product_id === product_id);

            // Retornar el producto o undefined si no está en el carrito
            return cartItem;

        },

        // Obtener cantidad de un producto en el carrito
        getItemQuantity: (product_id: string): number => {

            // Obtener la cantidad del producto en el carrito
            const cartItem = store.cartItems().find(item => item.product_id === product_id);

            // Retornar la cantidad del producto en el carrito o 0 si no está
            return cartItem?.quantity || 0;
        },

    })),

);
