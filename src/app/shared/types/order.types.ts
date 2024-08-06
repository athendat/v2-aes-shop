import { Coupon, Product, Stores, TransactionsData, User, UserAddress } from ".";

export type Order = {
    id: string;
    order_id: string;
    order_number: number;
    amount: number;
    store_id: string;
    store: Stores;
    consumer_id: string;
    consumer: User;
    consumer_name: string;
    products: Product[];
    coupon_id: string;
    coupon: Coupon;
    billing_address_id: string;
    billing_address: UserAddress;
    shipping_address_id: string;
    shipping_address: UserAddress;
    shipping_total: number;
    delivery_interval: string;
    order_status_id: string;
    order_status: OrderStatus;
    parent_id: string;
    payment_method: string;
    payment_mode: string;
    payment_status: string;
    delivery_description: string;
    order_payment_status: string;
    sub_orders: Order[];
    tax_total: number;
    total: number;
    points_amount: number;
    wallet_balance: number;
    transactions: TransactionsData[];
    invoice_url: string;
    status: boolean;
    created_by_id: string;
    deleted_at?: string;
    createdAt?: string;
    updatedAt?: string;
    items: OrderProduct[];
}

export type OrderCheckout = {
    total: CheckoutTotal | null;
}

export type CheckoutTotal = {
    convert_point_amount: number;
    convert_wallet_balance: number;
    coupon_total_discount: number;
    points: number;
    points_amount: number;
    shipping_total: number;
    sub_total: number;
    tax_total: number;
    total: number;
    wallet_balance: number;
}

export type CheckoutPayload = {
    consumer_id: string;
    products: OrderProduct[];
    shipping_address_id: string;
    billing_address_id: string;
    coupon?: string;
    points_amount?: boolean;
    wallet_balance?: boolean;
    delivery_description?: string;
    delivery_interval?: string;
    payment_method?: string;
}

export type OrderProduct = {
    product_id: string;
    variation_id: string | null | String;
    variation?: Product | null;
    quantity: number;
    price: number;
    name?: string;
}

export interface OrderStatus {
    id?: string;
    name: string;
    sequence: number;
    slug: string;
    created_by_id: string;
    status: boolean;
    deleted_at?: string;
    createdAt?: string;
    updatedAt?: string;
 }
