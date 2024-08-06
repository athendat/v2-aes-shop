import { Country, Point, Role, States, Wallet } from ".";

export type User = {
    id: string;
    name: string;
    createdAt: Date;
    email: string;
    phone?: string;
    country_code?: string;
    avatar?: string;
    avatar_id?: string;
    address?: UserAddress[];
    status: boolean;
    role_id: string;
    role_name: string;
    role: Role;
    point?: Point;
    wallet?: Wallet;
}

export type UserAddress = {
    id: string;
    user_id: string;
    title: string;
    street: string;
    city: string;
    pincode: string;
    country_code: string;
    state: States;
    country: Country;
    phone: number;
    is_default: boolean;
}


export class UpdatePwdInput {
    currentPwd: string;
    newPwd: string;
}

export class ResetPwdInput {
    id: string;
    newPwd: string;
}


