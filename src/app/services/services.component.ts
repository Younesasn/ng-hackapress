import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { ServicesSectionComponent } from './services-section/services-section.component';
import { ServiceCategory } from '../shared/entities';
import { ServiceCategoryService } from '../shared/services/service-category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [HeroComponent, ServicesSectionComponent],
  templateUrl: './services.component.html',
})
export class ServicesComponent implements OnInit, OnDestroy {
  constructor(private serviceCategoryService: ServiceCategoryService) {}

  serviceCategory: ServiceCategory[] = [];
  dataServices!: Subscription;

  ngOnInit(): void {
    this.fetchAll();
  }

  fetchAll(): void {
    this.dataServices = this.serviceCategoryService
      .getServiceCategory()
      .subscribe((data: ServiceCategory[]) => {
        this.serviceCategory = data;
      });
  }

  ngOnDestroy(): void {
    this.dataServices.unsubscribe();
  }
}
