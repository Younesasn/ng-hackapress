import { Component, Input } from '@angular/core';
import { Product, Service } from '../../shared/entities';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  imports: [CommonModule],
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
