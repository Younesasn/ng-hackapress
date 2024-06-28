import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { environment } from '../../environments/environment.development';
import {
  Matter,
  Product,
  ProductCategory,
  Service,
  ServiceCategory,
} from '../shared/entities';
import { CommonModule } from '@angular/common';
import { ProductService } from '../shared/services/product.service';
import { ServiceService } from '../shared/services/service.service';

type ModalType = 'service' | 'product';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnChanges {
  url: string = environment.url;
  filteredProducts: Product[] = [];
  filteredServices: Service[] = [];
  quantity: number = 1;

  @Input() name!: string;
  @Input() description!: string;
  @Input() image!: string;
  @Input() id!: number;
  @Input() matters!: Matter[];
  @Input() price?: number;
  @Input() categoryServices?: ServiceCategory[];
  @Input() categoryProducts?: ProductCategory[];
  @Input() products?: Product[];
  @Input() services?: Service[];
  @Input() type!: ModalType;
  @Output() close = new EventEmitter<void>();

  constructor(private productService: ProductService, private serviceService: ServiceService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoryProducts']) {
      this.filteredProducts = [];
    }

    if (changes['categoryService']) {
      this.filteredServices = [];
    }
  }

  closeModal() {
    this.close.emit();
  }

  plus() {
    if (this.quantity < 5) {
      this.quantity++;
    }
  }

  moins() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  onCategoryChange(event: any) {
    const selectedCategoryId = +event.target.value;
    const selectedCategory = this.categoryProducts?.find(
      (cat) => cat.id === selectedCategoryId
    );
    const selectedService = this.categoryServices?.find(
      (cat) => cat.id === selectedCategoryId
    );

    if (selectedCategory && selectedCategory.products.length > 0) {
      const productUrls = selectedCategory.products.map(
        (productUrl) => environment.url + productUrl
      );
      this.productService
        .getProductsByUrls(productUrls)
        .subscribe((products: Product[]) => {
          this.filteredProducts = products;
        });
    } else {
      this.filteredProducts = [];
    }

    if (selectedService && selectedService.services.length > 0) {
      const productUrls = selectedService.services.map(
        (productUrl) => environment.url + productUrl
      );
      this.serviceService
        .getServiceByUrls(productUrls)
        .subscribe((services: Service[]) => {
          this.filteredServices = services;
        });
    } else {
      this.filteredServices = [];
    }
  }
}
