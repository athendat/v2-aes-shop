import { Category, Role, User } from ".";
import { Attribute } from './attribute.types';


export class GQResponse {
    ok?: boolean;
    message?: string;
    pagination?: Pagination;


    user?: User;
    users?: User[];

}

export type GraphQLDataResponse = {


    //* Usuarios
    createUser: GQResponse;
    findAllUsers: GQResponse;
    findUserById: GQResponse;
    removeUser: GQResponse;
    resetUserPwd: GQResponse;
    updateUser: GQResponse;
    updateUserPwd: GQResponse;
    updateUserStatus: GQResponse;

}


export type Pagination = {
    length?: number;
    size?: number;
    page?: number;
    lastPage?: number;
    startIndex?: number;
    endIndex?: number;
}

// export type RestResponse = {
//     ok: boolean;
//     status?: string;
//     message?: string;
//     pagination?: Pagination;
//     token?: string;

//     attribute?: Attribute;
//     attributes?: Attribute[];

//     category?: Category;
//     categories?: Category;

//     role?: Role;
//     roles?: Role[];

//     user?: User;
//     users?: User[];
// }

export type RestResponse<T> = {
    ok: boolean;
    status?: string;
    message?: string;
    pagination?: Pagination;
    token?: string;
    data?: T;
}


export type SortOrder = 'asc' | 'desc' | '';

export class RequestParams {
    page?: number = 1;
    size?: number = 50;
    sort?: string = 'name';
    order?: SortOrder = 'desc';
    search?: string = '';
    status?: boolean | null = null;
    role?: string = '';
}


export type Params = {
    [key: string]: any;
}

export type PaginateModel = {
    current_page?: number;
    first_page_url?: string;
    from?: number;
    last_page?: number;
    last_page_url?: string;
    links?: Link2[];
    next_page_url?: string;
    path?: string;
    per_page?: number;
    prev_page_url?: string;
    to?: number;
    total: number;
}

export type Link2 = {
    active?: number;
    label?: string;
    url?: string;
}
