import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [HeroComponent],
  templateUrl: './services.component.html'
})
export class ServicesComponent {

}
