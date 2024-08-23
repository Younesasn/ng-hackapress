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
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CountUpModule } from 'ngx-countup';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CountUpModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnChanges, OnInit {

  urlImage: string = environment.urlImage;
  filteredProducts: Product[] = [];
  quantity = signal<number>(1);
  evolutedPrice!: Signal<number>;

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
  @Output() close = new EventEmitter<void>();

  public form: FormGroup = new FormGroup({
    category: new FormControl('', { validators: Validators.required }),
    product: new FormControl('', { validators: Validators.required }),
    matter: new FormControl('', { validators: Validators.required }),
    quantity: new FormControl(1, { validators: Validators.required }),
    price: new FormControl(0, { validators: Validators.required }),
  });

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.form.get('quantity')?.valueChanges.subscribe(() => {
      this.calculatePrice();
    });
    this.evolutedPrice = computed(() => this.price * this.quantity());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoryProducts']) {
      this.filteredProducts = [];
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
    this.form.get('price')?.setValue(this.evolutedPrice);
  }

  addServiceItem() {
    this.form.get('quantity')?.setValue(this.quantity().valueOf());
    this.form.get('price')?.setValue(this.evolutedPrice().valueOf());

    if (
      this.form.get('category')?.value === '' ||
      this.form.get('product')?.value === '' ||
      this.form.get('matter')?.value === ''
    ) {
      throw new Error('Veuillez remplir tous les champs');
    }

    let OneItem: OneItem = {
      service: `/api/services/${this.id}`,
      category: `/api/categories/${this.form.get('category')?.value}`,
      product: this.form.get('product')?.value,
      matter: this.form.get('matter')?.value,
      quantity: this.form.get('quantity')?.value,
      price: this.form.get('price')?.value,
      picture: this.image,
    };

    // Si cart existe déjà dans le localStorage
    if (localStorage.getItem('cart')) {
      const items = JSON.parse(localStorage.getItem('cart')!);
      if (
        items.find(
          (item: OneItem) =>
            item.product === OneItem.product && item.matter === OneItem.matter && item.service === OneItem.service
        )
      ) {
        items.find(
          (item: OneItem) => item.product === OneItem.product
        ).quantity += OneItem.quantity;
        items.find((item: OneItem) => item.product === OneItem.product).price +=
          OneItem.price;
      } else {
        items.push(OneItem);
      }
      localStorage.setItem('cart', JSON.stringify(items));
    } else {
      localStorage.setItem('cart', JSON.stringify([OneItem]));
    }
    this.closeModal();
  }

  onCategoryChange(event: any) {
    const selectedCategoryId = +event.target.value;
    const selectedCategory = this.categoryProducts?.find(
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
  }
}
