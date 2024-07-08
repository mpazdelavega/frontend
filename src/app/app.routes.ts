import { Routes } from '@angular/router';
import { CardComponent } from './component/card/card.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';

export const routes: Routes = [
    {
        path: 'products',
        pathMatch: 'full',
        redirectTo: '/products/page/0'
    },
    {
        path: 'products/page/:page', 
        component: CardComponent
    },
    {
        path: 'cart',
        component: ShoppingCartComponent
    }
    // {
    //     path: 'products', 
    //     component: CardComponent
    // }
];
