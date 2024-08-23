import { Component } from '@angular/core';
import { CountUpModule } from 'ngx-countup';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CountUpModule],
  templateUrl: './why-us.component.html'
})
export class WhyUsComponent {
  texts: string[] = ['Nettoyage', 'Repassage', 'Retouche'];
  displayedText: string = 'Lavage';
  currentIndex: number = 0;

  ngOnInit(): void {
    this.changeText();
  }

  changeText(): void {
    setInterval(() => {
      this.displayedText = this.texts[this.currentIndex];
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
    }, 3000);
  }
}
