import { GuardName } from "./role.types";

export type Permission = {
    id: number;
    name: string;
    guard_name?: GuardName;
}
