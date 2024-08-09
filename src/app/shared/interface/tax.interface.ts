export interface Tax {
    id: string,
    name: string,
    rate: number,
    country_id: string,
    state_id: string,
    pincode: number,
    city: string,
    status: boolean,
    created_by_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}
