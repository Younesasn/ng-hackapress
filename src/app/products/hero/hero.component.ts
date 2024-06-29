import { Component } from '@angular/core';

@Component({
  selector: 'app-hero:not(hero-products)',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

}
