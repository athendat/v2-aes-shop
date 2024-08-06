export type Tag = {
    id: string;
    name: string;
    slug: string;
    type: string;
    description: string;
    created_by_id: string;
    status: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    blogs_count: number;
    products_count: number;
    pivot: TagPivot;
}

export type TagPivot = {
    product_id: string;
    tag_id: string;
}
