import { Attachment } from ".";

export type Category = {
    id: string;
    name: string;
    slug: string;
    description: string;
    category_image_id: number;
    category_icon_id: number;
    status: number;
    type: CategoryType;
    commission_rate: number;
    parent_id: string;
    created_by_id: string;
    createdAt: Date;
    updatedAt: Date;
    deleted_at: Date;
    blogs_count: number;
    products_count: number;
    pivot: CategoryPivot;
    category_image: Attachment;
    category_icon: Attachment;
}

export type CategoryPivot = {
    product_id: string;
    category_id: string;
}

export enum CategoryType {
    post = 'post',
    product = 'product',
}

export type CategoriesData = {
    categories: Category[];
    categoriesTree: Category[];
}
