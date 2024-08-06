import { User } from "./user.types";

export type AuthResponse = {
    ok: boolean;
    message: string;
    token: string;
    user: User;
}

export type SignUpFormData = {
    name: string | null;
    lastname1: string | null;
    lastname2?: string | null;
    email: string | null;
    username: string | null;
    pwd: string | null;
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
