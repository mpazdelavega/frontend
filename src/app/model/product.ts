import { Brand } from "./brand";
import { Gender } from "./gender";
import { Product_type } from "./product_type";

export class Product {
    id: number = 0;
    name!: string;
    description!: string;
    discount: number = 0;
    photo!: string;
    price: number = 0;
    dateAdded!: Date;
    rating!: string;
    color!: string;
    status!: string;
    Product_type: Product_type[] = [];
    Gender: Gender[] = [];
    Brand: Brand[] = [];

}