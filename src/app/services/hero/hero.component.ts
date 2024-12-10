import { Component } from '@angular/core';

@Component({
  selector: 'app-hero:not(hero-services)',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
})
export class HeroComponent {

}
