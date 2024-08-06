import { Product, Variation } from "./products.types";

export type Cart = {
    consumer_id: string;
    items: CartItem[];
}


export type CartItem = {
    product_id: string;
    product: Product;
    variation_id?: string;
    variation?: Variation;
    quantity: number;
    price: number;
}
