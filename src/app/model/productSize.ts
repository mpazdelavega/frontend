import { Product } from "./product";
import { Size } from "./size";

export class ProductSize {

    id: number = 0;
    product!: Product;
    size!: Size;
    stock: number = 0;
    
}