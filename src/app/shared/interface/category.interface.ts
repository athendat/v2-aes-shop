import { PaginateModel } from "./core.interface";
import { Attachment } from "./attachment.interface";

export interface CategoryModel extends PaginateModel {
    data: Category[];
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    type: string;
    parent_id?: string;
    category_image?: Attachment;
    category_image_id?: string;
    category_icon?: Attachment;
    category_icon_id?: string;
    commission_rate?: number;
    subcategories?: Category[];
    products_count: number;
    status: boolean;
    created_by_id?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
