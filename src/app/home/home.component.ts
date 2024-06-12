import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { StatsComponent } from './stats/stats.component';
import { ProductsComponent } from './products/products.component';
import { WhyUsComponent } from './why-us/why-us.component';
import { PlansComponent } from './plans/plans.component';
import { TeamComponent } from './team/team.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, StatsComponent, ProductsComponent, WhyUsComponent, PlansComponent, TeamComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  
}
