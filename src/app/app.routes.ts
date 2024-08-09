import { Routes } from '@angular/router';
import { CardComponent } from './component/card/card.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { DetailsProductComponent } from './component/details-product/details-product.component';
import { LoginComponent } from './component/login/login.component';

export const routes: Routes = [
    {
        path: 'products/page', 
        component: CardComponent
    },
    {
        path: 'cart',
        component: ShoppingCartComponent
    },
    {
        path: 'login',
        component: LoginComponent
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
    },
    { 
        path: 'products/all', 
        component: CardComponent 
    }
];
