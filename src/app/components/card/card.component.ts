import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product, Service } from '../../shared/entities';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { environment } from '../../../environments/environment.development';

@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
    imports: [RouterLink, CommonModule, ButtonComponent]
})
export class CardComponent {
  urlImage: string = environment.urlImage;

  @Input() data!: Service | Product;
  @Input() name!: string;
  @Input() description!: string;
  @Input() link!: string;
  @Input() image?: string;
  @Input() id!: number;
  @Input() price?: number;

  constructor() {}
}
