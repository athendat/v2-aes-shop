import { Permission } from ".";

export type Role = {
    id: string;
    name: string;
    description: string;
    guard_name: GuardName;
    permissions_ids: number[];
    permissions: Permission[];
}

export type GuardName = "web";
