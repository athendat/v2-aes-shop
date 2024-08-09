import { PaginateModel } from "./core.interface";

export interface OrderStatusModel extends PaginateModel {
   data: OrderStatus[];
}

export interface OrderStatus {
   id: string;
   name: string;
   sequence: number;
   slug: string;
   created_by_id: string;
   status: boolean;
   deleted_at: string;
   created_at: string;
   updated_at: string;
}
