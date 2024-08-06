

export type Currency = {
    id: string;
    code: string;
    symbol: string;
    no_of_decimal: number;
    exchange_rate: number;
    symbol_position: string;
    thousands_separator: string;
    decimal_separator: string;
    status: boolean;
    system_reserve: boolean;
    created_by_id: string;
    deleted_at?: string;
}

