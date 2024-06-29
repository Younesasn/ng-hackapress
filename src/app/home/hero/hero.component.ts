import { Component } from '@angular/core';
import { ButtonComponent } from "../../button/button.component";

@Component({
    selector: 'app-hero:not(hero-home)',
    standalone: true,
    templateUrl: './hero.component.html',
    imports: [ButtonComponent]
})
export class HeroComponent {
  
}
