export interface Point {
    id?: string;
    consumer_id: string;
    balance: number;
    transactions: Transactions;
    deleted_at?: string;
}

export interface Transactions {
    current_page: number;
    data: TransactionsData[];
    first_page_url: string;
    from: string;
    last_page: number;
    last_page_url: string;
    links: [];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface TransactionsData {
    id?: string;
    wallet_id: string;
    order_id: string;
    point_id: string;
    amount: number;
    type: string;
    type_status: string;
    detail: string;
    from: number;
    deleted_at?: string;
}
