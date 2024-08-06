import { Role, Wallet } from ".";

export type Vendor = {
    id: string;
    name: string;
    email: string;
    country_code: string;
    phone: number;
    profile_image_id: null;
    system_reserve: string;
    status: number;
    created_by_id: number;
    email_verified_at: null;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    orders_count: number;
    role: Role;
    point: null;
    wallet: null;
    address: any[];
    vendor_wallet: Wallet;
    profile_image: null;
    payment_account: null;
}
