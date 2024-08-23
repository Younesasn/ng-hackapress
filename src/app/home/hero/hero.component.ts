import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-hero:not(hero-home)',
  standalone: true,
  templateUrl: './hero.component.html',
  imports: [ButtonComponent],
})
export class HeroComponent implements OnInit {
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
