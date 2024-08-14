import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { authGuard } from './shared/guards/auth.guard';
import { ContactComponent } from './contact/contact.component';
import { PaymentComponent } from './payment/payment.component';

export const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'cart', component: CartComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
];
