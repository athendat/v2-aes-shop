import { Attachment, AttributeValue, Category, Pagination, Review, Stores, Tag, Tax } from ".";

export type Product = {
    id: string;
    attributes: any[];
    can_review: boolean;
    categories: Category[];
    created_by_id: string;
    cross_sell_products: Product[];
    deleted_at: Date | null;
    description: string;
    discount: number;
    encourage_order: number;
    encourage_view: number;
    estimated_delivery_text: null;
    is_approved: number;
    is_cod: string;
    is_featured: number;
    is_free_shipping: number;
    is_random_related_products: number;
    is_return: number;
    is_sale_enable: number;
    is_trending: number;
    meta_description: string;
    meta_title: string;
    name: string;
    order_amount: number;
    orders_count: number;
    price: number;
    product_galleries: Attachment[];
    product_meta_image_id: string;
    product_meta_image: Attachment;
    product_thumbnail_id: number;
    product_thumbnail: Attachment;
    quantity: number;
    rating_count: number;
    related_products: Product[];
    return_policy_text: null;
    review_ratings: number[];
    reviews_count: number;
    reviews: Review[];
    safe_checkout: number;
    sale_expired_at: Date | null;
    sale_price: number;
    sale_starts_at: Date | null;
    secure_checkout: number;
    shipping_days: null;
    short_description: string;
    size_chart_image_id: null;
    size_chart_image: string | null;
    sku: string;
    slug: string;
    social_share: number;
    status: number;
    stock_status: string;
    store_id: number;
    store: Stores;
    tags: Tag[];
    tax_id: number;
    tax: Tax;
    type: string;
    unit: string;
    variations: Variation[];
    weight: number;
}

export type ProductsListResponse = {
    products: Product[];
    pagination: Pagination;
}

export type Variation = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    stock_status: string;
    sale_price: number;
    discount: number;
    sku: string;
    status: number;
    variation_options: any;
    variation_image_id: string;
    product_id: string;
    deleted_at: Date;
    variation_image: Attachment;
    attribute_values: AttributeValue[];
}

export type SelectedVariant = {
    id: string;
    attribute_id: string;
}
