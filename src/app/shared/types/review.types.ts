import { Attachment, Product, Stores, User } from ".";

export type Review = {
    id: string;
    consumer: User;
    consumer_id: number;
    consumer_name: string;
    description: string;
    product: Product;
    product_id: number;
    product_name: string;
    rating: number;
    review_image: Attachment;
    review_image_id: number;
    product_review_image: Attachment;
    store: Stores;
    store_id: number;
    created_at?: string;
    deleted_at?: string;
    updated_at?: string;
}
