import { Attachment } from "./attachment.interface";
import { PaginateModel } from "./core.interface";

export interface PaymentMethodModel extends PaginateModel {
    data: PaymentMethod[];
}

export interface PaymentMethod {
    id: string;
    status: boolean;
    sandbox_mode: boolean;
    name: string;
    slug: string;
    logo_id?: string;
    logo?: Attachment;
    api_url?: string;
    client_id?: string;
    secret?: string;
    key?: string;
    created_by_id: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
