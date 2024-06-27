import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CardComponent } from '../../card/card.component';
import { ModalComponent } from '../../modal/modal.component';
import { Product } from '../../shared/entities';
import { ProductService } from '../../shared/services/product.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-section',
  standalone: true,
  imports: [CardComponent, ModalComponent, CommonModule],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.css',
})
export class ProductsSectionComponent implements OnInit, OnChanges, OnDestroy {
  products: Product[] = [];
  selectedProduct: Product | null = null;

  dataProducts!: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fecthProducts();
  }

  fecthProducts(): void {
    this.dataProducts = this.productService
      .getProduct()
      .subscribe((products) => {
        this.products = products;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    this.dataProducts.unsubscribe();
  }

  openModal(product: Product): void {
    this.selectedProduct = product;
  }

  closeModal(): void {
    this.selectedProduct = null;
  }
}
