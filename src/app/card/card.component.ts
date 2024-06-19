import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  count: number = 0;

  plus() {
    if(this.count > 4) {
      console.log('non')
    } else {
      this.count++;
    }
  }
  moins() {
    if (this.count < 1) {
      console.log('non');
    } else {
      this.count--;
    }
  }
}
