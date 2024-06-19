import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { ServicesSectionComponent } from './services-section/services-section.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [HeroComponent, ServicesSectionComponent],
  templateUrl: './services.component.html'
})
export class ServicesComponent {

}
