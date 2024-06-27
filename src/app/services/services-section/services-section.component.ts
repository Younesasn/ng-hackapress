import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CardComponent } from '../../card/card.component';
import { CommonModule } from '@angular/common';
import {
  Product,
  ProductCategory,
  Service,
  ServiceCategory,
} from '../../shared/entities';
import { ServiceService } from '../../shared/services/service.service';
import { Subscription } from 'rxjs';
import { ModalComponent } from '../../modal/modal.component';
import { ProductCategoryService } from '../../shared/services/product-category.service';
import { ProductService } from '../../shared/services/product.service';
import { ServiceCategoryService } from '../../shared/services/service-category.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CardComponent, CommonModule, ModalComponent],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.css',
})
export class ServicesSectionComponent implements OnInit, OnDestroy {
  services: Service[] = [];
  productCategory: ProductCategory[] = [];
  products: Product[] = [];
  serviceCategory: ServiceCategory[] = [];

  test: string[] = [];

  dataServices!: Subscription;
  dataCategories!: Subscription;
  dataProducts!: Subscription;
  dataCategoriesService!: Subscription;

  selectedService: Service | null = null;

  constructor(
    private serviceService: ServiceService,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private serviceCategoryService: ServiceCategoryService
  ) {}

  ngOnInit(): void {
    this.fetchAllServices();
    this.fecthAllCategoriesService();
    this.fetchAllProducts();
    this.fetchAllCategoriesProduct();
  }

  fetchAllServices() {
    this.dataServices = this.serviceService
      .getService()
      .subscribe((services: Service[]) => {
        this.services = services;
      });
  }

  fetchAllCategoriesProduct() {
    this.dataCategories = this.productCategoryService
      .getProductCategory()
      .subscribe((categories: ProductCategory[]) => {
        this.productCategory = categories;
      });
  }

  fetchAllProducts() {
    this.dataProducts = this.productService
      .getProduct()
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  fecthAllCategoriesService(): void {
    this.dataCategoriesService = this.serviceCategoryService
      .getServiceCategory()
      .subscribe((categories: ServiceCategory[]) => {
        this.serviceCategory = categories;
      });
  }

  openModal(service: Service) {
    this.selectedService = service;
  }

  closeModal() {
    this.selectedService = null;
  }

  ngOnDestroy(): void {
    this.dataServices.unsubscribe();
  }
}
