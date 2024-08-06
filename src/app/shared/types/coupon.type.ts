import { Product } from "./products.types";

export type Coupon = {
    id: string;
    title: string;
    description: string;
    code: string;
    type: string;
    amount: number;
    min_spend: number;
    max_spend: number;
    is_unlimited: boolean;
    usage_per_coupon: number;
    usage_per_customer: number;
    is_expired: boolean;
    start_date: string;
    end_date: string;
    is_apply_all: boolean;
    exclude_products: Product[];
    products: Product[];
    is_first_order: boolean;
    status: boolean;
    created_by_id: string;
    createdAt?: Date;
    updatedAt?: Date;
    deleted_at?: Date;
}
