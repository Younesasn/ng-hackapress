import { Component } from '@angular/core';

@Component({
  selector: 'app-hero:not(hero-services)',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {

}
