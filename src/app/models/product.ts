import { collection } from "./collection";

export interface product extends collection {
    name: string;
    price: number;
    description?: string;
    imageUrl?: string;
}