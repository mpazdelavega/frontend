import { Routes } from '@angular/router';
import { CardComponent } from './component/card/card.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { DetailsProductComponent } from './component/details-product/details-product.component';

export const routes: Routes = [
    {
        path: 'products/page/:page', 
        component: CardComponent
    },
    {
        path: 'cart',
        component: ShoppingCartComponent
    },
    {
        path: 'product/:id',
        component: DetailsProductComponent 
    },
    {
        path: 'products', 
        component: CardComponent
    },
    {
        path: 'products/filter2', 
        component: CardComponent
    },
    {
        path: 'products/category/:category', 
        component: CardComponent
    },
    {
        path: 'products/by-category-gender', 
        component: CardComponent
    },
    {
        path: 'products/gender/:gender', 
        component: CardComponent
    },
    {
        path: 'products/brand/:brand', 
        component: CardComponent
    }
];
