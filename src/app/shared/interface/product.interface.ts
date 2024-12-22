import { PaginateModel } from "./core.interface";
import { Attachment } from "./attachment.interface";
import { Attribute, AttributeValue } from "./attribute.interface";
import { Category } from "./category.interface";
import { Stores } from "./store.interface";
import { Tag } from "./tag.interface";
import { Tax } from "./tax.interface";
import { Review } from "./review.interface";
import { QuestionAnswers } from "./questions-answers.interface";

export interface ProductModel extends PaginateModel {
    data: Product[];
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    short_description: string;
    description: string;
    type: string;
    product_thumbnail_id?: string;
    product_thumbnail?: Attachment;
    product_galleries_id?: [];
    product_galleries?: Attachment[];
    unit: string;
    weight: number;
    price: number;
    sale_price: number;
    discount: number;
    is_sale_enable: boolean | number,
    sale_starts_at: string,
    sale_expired_at: string,
    sku: string;
    stock_status: string;
    stock: string;
    visible_time: string;
    quantity: number;
    store_id?: string;
    size_chart_image_id: string;
    size_chart_image: Attachment;
    estimated_delivery_text: string;
    return_policy_text: string;
    safe_checkout: boolean;
    secure_checkout: boolean;
    social_share: boolean;
    encourage_order: boolean;
    encourage_view: boolean;
    is_free_shipping: boolean;
    is_featured: boolean | number;
    is_trending: boolean;
    is_return: boolean | number;
    shipping_days: number;
    tax_id: string;
    tax: Tax;
    status: boolean;
    meta_title: string;
    meta_description: string;
    product_meta_image: Attachment;
    product_meta_image_id: string;
    tags: Tag[];
    tag: Tag;
    categories: Category[];
    category: Category;
    store?: Stores;
    store_name?: string;
    orders_count: string | number;
    order_amount: string | number;
    attribute_values: [];
    variations: Variation[];
    variants: Variant[];
    attributes: Attribute[];
    attributes_ids: string[];
    is_random_related_products: boolean;
    related_products_id: string[];
    related_products: Product[];
    cross_sell_products: string[];
    pivot?: PivotProduct;
    created_by_id: string;
    is_approved: boolean;
    total_in_approved_products: number;
    published_at: string;
    questions: QuestionAnswers[];
    reviews: Review[];
    reviews_count: number;
    rating_count: number;
    review_ratings: number[];
    user_review: Review;
    can_review: boolean;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface PivotProduct {
    order_id: string;
    product_id: string;
    quantity: number;
    shipping_cost: number;
    single_price: number;
    subtotal: number;
    variation_id?: string;
    variation: Variation;
    is_refunded: number;
}

export interface Variation {
    id: string;
    name: string;
    price: number;
    sale_price: number;
    stock_status: string;
    sku: string;
    discount: number;
    quantity: number;
    variation_image: Attachment;
    variation_image_id: string;
    variation_options: VariationOption[];
    attribute_values: AttributeValue[];
    selected_variation: string;
    status: boolean;
}

export interface VariationOption {
    name: string;
    value: string;
}

export interface Variant {
    id: string | null;
    attribute_values: number[] | null;
    options: any;
    variant_option: any;
}

export interface SelectedVariant {
    id: string;
    attribute_id: string;
}
