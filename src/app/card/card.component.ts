import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product, Service } from '../shared/entities';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../button/button.component";

@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
    imports: [RouterLink, CommonModule, ButtonComponent]
})
export class CardComponent {
  @Input() data!: Service | Product;
  @Input() name!: string;
  @Input() description!: string;
  @Input() link!: string;
  @Input() image?: string;
  @Input() id!: number;
  @Input() price?: number;
}
