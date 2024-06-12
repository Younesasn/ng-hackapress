import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { StatsComponent } from './stats/stats.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, StatsComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  
}
