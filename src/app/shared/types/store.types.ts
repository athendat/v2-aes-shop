import { Attachment, Country, Review, States, User } from ".";

export type Stores = {
    id: string;
    store_name: string;
    description: string;
    slug: string;
    store_logo_id: number;
    store_cover_id: string | null;
    country_id: number;
    state_id: number;
    city: string;
    address: string;
    pincode: string;
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string | null;
    pinterest: string | null;
    hide_vendor_email: number;
    hide_vendor_phone: number;
    vendor_id: number;
    created_by_id: string;
    status: number;
    is_approved: number;
    deleted_at: Date;
    orders_count: number;
    reviews_count: number;
    products_count: number;
    product_images: string[];
    order_amount: number;
    rating_count: number;
    store_logo: Attachment;
    store_cover: Attachment;
    vendor: User;
    country: Country;
    state: States;
    reviews: Review[];
}
