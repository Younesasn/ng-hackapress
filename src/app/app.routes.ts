import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
    {path: "services", component: ServicesComponent},
    {path: "products", component: ProductsComponent},
    {path: "", component: HomeComponent}
];
