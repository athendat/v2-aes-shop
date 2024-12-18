export type Pagination = {
    length?: number;
    size?: number;
    page?: number;
    lastPage?: number;
    startIndex?: number;
    endIndex?: number;
}

export type RestResponse<T> = {
    ok: boolean;
    status?: string;
    message?: string;
    pagination?: Pagination;
    token?: string;
    data?: T;
}
