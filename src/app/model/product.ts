import { Product_type } from "./product_type";

export class Product {
    id: number = 0;
    name!: string;
    price: number = 0;
    Product_type: Product_type[] = [];
}