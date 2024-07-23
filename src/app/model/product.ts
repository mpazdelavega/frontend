import { Product_type } from "./product_type";

export class Product {
    id: number = 0;
    name!: string;
    description!: string;
    discount: number = 0;
    photo!: string;
    price: number = 0;
    Product_type: Product_type[] = [];
}