import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  OnInit,
  signal,
  computed,
  Signal,
} from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  Matter,
  OneItem,
  Product,
  ProductCategory,
  Service,
  ServiceCategory,
} from '../../shared/entities';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../shared/services/product.service';
import { ServiceService } from '../../shared/services/service.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

type ModalType = 'service' | 'product';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnChanges, OnInit {
  url: string = environment.url;
  filteredProducts: Product[] = [];
  filteredServices: Service[] = [];
  quantity = signal<number>(1);
  evolutedPrice!: Signal<number>;

  public form: FormGroup = new FormGroup({
    category: new FormControl('', { validators: Validators.required }),
    product: new FormControl('', { validators: Validators.required }),
    matter: new FormControl('', { validators: Validators.required }),
    quantity: new FormControl(1, { validators: Validators.required }),
    price: new FormControl(0, { validators: Validators.required }),
  });

  @Input() name!: string;
  @Input() description!: string;
  @Input() image!: string;
  @Input() id!: number;
  @Input() matters!: Matter[];
  @Input() price!: number;
  @Input() categoryServices?: ServiceCategory[];
  @Input() categoryProducts?: ProductCategory[];
  @Input() products?: Product[];
  @Input() services?: Service[];
  @Input() type!: ModalType;
  @Output() close = new EventEmitter<void>();

  constructor(
    private productService: ProductService,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.form.get('quantity')?.valueChanges.subscribe(() => {
      this.calculatePrice();
    });
    this.evolutedPrice = computed(() => this.price * this.quantity());

    if (this.type === 'product') {
      this.form.get('price')?.setValue(0);
    }
  }

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
    if (this.quantity() < 5) {
      this.quantity.set(this.quantity() + 1);
    }
  }

  moins() {
    if (this.quantity() > 1) {
      this.quantity.set(this.quantity() - 1);
    }
  }

  calculatePrice() {
    const basePrice = this.price || 0;
    this.form.get('price')?.setValue(this.evolutedPrice);
  }

  addItem() {
    this.form.get('quantity')?.setValue(this.quantity().valueOf());
    this.form.get('price')?.setValue(this.evolutedPrice().valueOf());
    let item: OneItem = {
      category: '',
      product: '',
      matter: '',
      quantity: 0,
      price: 0,
    };
    if (this.type === 'product') {
      item = {
        category: `/api/categories/${this.form.get('category')?.value}`,
        product: `/api/services/${this.form.get('product')?.value}`,
        matter: `/api/matters/${this.form.get('matter')?.value}`,
        quantity: this.form.get('quantity')?.value,
        price: this.form.get('price')?.value,
      };
    }
    if (this.type === 'service') {
      item = {
        category: `/api/categories/${this.form.get('category')?.value}`,
        product: `/api/products/${this.form.get('product')?.value}`,
        matter: `/api/matters/${this.form.get('matter')?.value}`,
        quantity: this.form.get('quantity')?.value,
        price: this.form.get('price')?.value,
      };
    }
    console.log(item);
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