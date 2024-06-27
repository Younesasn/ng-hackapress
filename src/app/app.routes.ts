import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';

export const routes: Routes = [
    {path: "services", component: ServicesComponent},
    {path: "", component: HomeComponent}
];
