import { States } from "./state.types";

export type Country = {
    id: string;
    name: string;
    currency: string;
    currency_symbol: string;
    iso_3166_2: string;
    iso_3166_3: string;
    calling_code: string;
    flag: string;
    states?: States[];
}
