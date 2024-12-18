import { PaginateModel } from "./core.interface";
import { Attachment } from "./attachment.interface";
import { Order } from "./order.interface";
import { Stores } from "./store.interface";
import { User } from "./user.interface";

export interface RefundModel extends PaginateModel {
    data: Refund[];
}

export interface Refund {
    id: number;
    reason: string;
    amount: number;
    quantity: number;
    store_id: string;
    store: Stores;
    order: Order;
    order_id?: string;
    product_id: string;
    consumer_id: string;
    user: User;
    consumer_name?: string;
    consumer_phone?: string;
    variation_id?: string;
    refund_image_id: string;
    payment_type: string;
    status: string;
    refund_status: string;
    is_used: number;
    refund_image: Attachment;
    total_pending_refunds: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
