import { Product, Variation } from "./product.interface";

export interface CartModel {
    items: Cart[];
    total?: number;
}

export interface Cart {
    id: string;
    product_id: string;
    variation: Variation;
    variation_id: string | null;
    consumer_id?: string;
    quantity: number;
    sub_total: number;
    product: Product;
    created_by_id?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface CartAddOrUpdate {
    id: string | null;
    product: Product | null;
    product_id: string;
    variation: Variation | null;
    variation_id: string | null;
    quantity: number;
}
