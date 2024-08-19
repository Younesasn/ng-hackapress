import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
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
import { ModalComponent } from '../../components/modal/modal.component';
import { ProductCategoryService } from '../../shared/services/product-category.service';
import { ServiceCategoryService } from '../../shared/services/service-category.service';
import { MatterService } from '../../shared/services/matter.service';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CardComponent, CommonModule, ModalComponent],
  templateUrl: './services-section.component.html',
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
    private serviceCategoryService: ServiceCategoryService
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
      .subscribe((services) => {
        this.services = services['hydra:member'];
      });
  }

  fetchAllCategoriesProduct() {
    this.dataCategories = this.productCategoryService
      .getProductCategory()
      .subscribe((categories) => {
        this.productCategory = categories['hydra:member'];
      });
  }

  fecthAllCategoriesService(): void {
    this.dataCategoriesService = this.serviceCategoryService
      .getServiceCategory()
      .subscribe((categories) => {
        this.serviceCategory = categories['hydra:member'];
      });
  }

  fetchAllMatters(): void {
    this.dataMatters = this.matterService.getMatter().subscribe((matters) => {
      this.matters = matters['hydra:member'];
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
