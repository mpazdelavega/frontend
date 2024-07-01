import { Routes } from '@angular/router';
import { CardComponent } from './component/card/card.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/products/page/0'
    },
    {
        path: 'products/page/:page', 
        component: CardComponent
    },
    {
        path: 'products', 
        component: CardComponent
    }
];
