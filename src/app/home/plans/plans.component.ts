import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceCategoryService } from '../../shared/services/service-category.service';
import { ServiceCategory } from '../../shared/entities';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './plans.component.html',
})
export class PlansComponent implements OnInit, OnDestroy {
  serviceCategory: ServiceCategory[] = [];
  dataServices!: Subscription;

  constructor(private serviceCategoryService: ServiceCategoryService) {}

  ngOnInit(): void {
    this.fetchAll();
  }

  fetchAll(): void {
    this.dataServices = this.serviceCategoryService
      .getServiceCategory()
      .subscribe((data) => {
        this.serviceCategory = data['hydra:member'];
      });
  }

  ngOnDestroy(): void {
    this.dataServices.unsubscribe();
  }
}
