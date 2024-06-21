import { Component, OnInit } from '@angular/core';
import { ServiceCategoryService } from '../../shared/services/service-category.service';
import { ServiceCategory } from '../../entities';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './plans.component.html',
})
export class PlansComponent implements OnInit {
  serviceCategory: ServiceCategory[] = [];

  constructor(private serviceCategoryService: ServiceCategoryService) {}

  ngOnInit(): void {
    this.serviceCategoryService.getServiceCategory().subscribe((data: ServiceCategory[]) => {
      this.serviceCategory = data;
      console.log(this.serviceCategory[0]);
    });
  }
}
