import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardComponent } from '../../card/card.component';
import { CommonModule } from '@angular/common';
import {
  Matter,
  Product,
  ProductCategory,
  Service,
  ServiceCategory,
} from '../../shared/entities';
import { ServiceService } from '../../shared/services/service.service';
import { Subscription } from 'rxjs';
import { ModalComponent } from '../../modal/modal.component';
import { ProductCategoryService } from '../../shared/services/product-category.service';
import { ServiceCategoryService } from '../../shared/services/service-category.service';
import { MatterService } from '../../shared/services/matter.service';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CardComponent, CommonModule, ModalComponent],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.css',
})
export class ServicesSectionComponent implements OnInit, OnDestroy {
  services: Service[] = [];
  selectedService: Service | null = null;

  productCategory: ProductCategory[] = [];
  products: Product[] = [];

  serviceCategory: ServiceCategory[] = [];
  matters: Matter[] = [];

  dataServices!: Subscription;
  dataCategories!: Subscription;
  dataCategoriesService!: Subscription;
  dataMatters!: Subscription;

  constructor(
    private matterService: MatterService,
    private serviceService: ServiceService,
    private productCategoryService: ProductCategoryService,
    private serviceCategoryService: ServiceCategoryService,
  ) {}

  ngOnInit(): void {
    this.fetchAllMatters();
    this.fetchAllServices();
    this.fecthAllCategoriesService();
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

  fecthAllCategoriesService(): void {
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

  openModal(service: Service) {
    this.selectedService = service;
  }

  closeModal() {
    this.selectedService = null;
  }

  ngOnDestroy(): void {
    this.dataMatters.unsubscribe();
    this.dataServices.unsubscribe();
    this.dataCategories.unsubscribe();
    this.dataCategoriesService.unsubscribe();
  }
}
