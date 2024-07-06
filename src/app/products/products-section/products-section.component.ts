import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ModalComponent } from '../../components/modal/modal.component';
import {
  Matter,
  Product,
  ProductCategory,
  ServiceCategory,
} from '../../shared/entities';
import { ProductService } from '../../shared/services/product.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatterService } from '../../shared/services/matter.service';
import { ServiceCategoryService } from '../../shared/services/service-category.service';

@Component({
  selector: 'app-products-section',
  standalone: true,
  imports: [CardComponent, ModalComponent, CommonModule],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.css',
})
export class ProductsSectionComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  selectedProduct: Product | null = null;

  productCategory: ProductCategory[] = [];
  serviceCategory: ServiceCategory[] = [];

  matters: Matter[] = [];

  dataProducts!: Subscription;
  dataMatters!: Subscription;
  dataCategoriesService!: Subscription;

  constructor(
    private matterService: MatterService,
    private productService: ProductService,
    private serviceCategoryService: ServiceCategoryService
  ) {}

  ngOnInit(): void {
    this.fecthProducts();
    this.fetchAllMatters();
    this.fetchAllCategoriesService();
  }

  fecthProducts(): void {
    this.dataProducts = this.productService
      .getProduct()
      .subscribe((products) => {
        this.products = products;
      });
  }

  fetchAllCategoriesService(): void {
    this.dataCategoriesService = this.serviceCategoryService
      .getServiceCategory()
      .subscribe((categories: ServiceCategory[]) => {
        this.serviceCategory = categories;
      });
  }

  fetchAllMatters(): void {
    this.dataMatters = this.matterService
      .getMatter()
      .subscribe((matters: Matter[]) => {
        this.matters = matters;
      });
  }

  openModal(product: Product): void {
    this.selectedProduct = product;
  }

  closeModal(): void {
    this.selectedProduct = null;
  }

  ngOnDestroy(): void {
    this.dataMatters.unsubscribe();
    this.dataProducts.unsubscribe();
    this.dataCategoriesService.unsubscribe();
  }
}
