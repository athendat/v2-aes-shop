import { User } from "./user.types";

export type AuthResponse = {
    ok: boolean;
    message: string;
    token: string;
    user: User;
}

export type SignUpFormData = {
    name: string | null;
    phone: string | null;
    email: string | null;
    country_code: string | null;
    password: string | null;
    agreements: boolean | null;
}

export type SignInForm = {
    email: string;
    pwd: string;
}


export type SignInResponse = {
    token: string;
    user: User;
}
