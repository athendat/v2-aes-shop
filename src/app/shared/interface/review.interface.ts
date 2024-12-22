import { Attachment } from "./attachment.interface"
import { PaginateModel } from "./core.interface";
import { Product } from "./product.interface"
import { Stores } from "./store.interface"
import { User } from "./user.interface"

export interface ReviewModel extends PaginateModel {
  data: Review[];
}
export interface Review {
    id: string;
    consumer: User;
    consumer_id: string;
    consumer_name: string;
    description: string;
    product: Product;
    product_id: string;
    product_name: string;
    rating: number;
    review_image: Attachment;
    review_image_id: string;
    product_review_image: Attachment;
    store: Stores;
    store_id: string;
    created_at?: string;
    deleted_at?: string;
    updated_at?: string;
}
