import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
// import { AuthGuard } from './shared/auth.guard';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
];
