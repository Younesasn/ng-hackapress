import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { StatsComponent } from './stats/stats.component';
import { ProductsComponent } from './products/products.component';
import { WhyUsComponent } from './why-us/why-us.component';
import { PlansComponent } from './plans/plans.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, StatsComponent, ProductsComponent, WhyUsComponent, PlansComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  
}
