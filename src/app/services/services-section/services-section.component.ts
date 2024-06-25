import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CardComponent } from '../../card/card.component';
import { CommonModule } from '@angular/common';
import { Service } from '../../shared/entities';
import { ServiceService } from '../../shared/services/service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.css'
})
export class ServicesSectionComponent implements OnInit, OnDestroy {
  services: Service[] = [];
  dataServices!: Subscription;

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.fetchAll();
  }

  fetchAll() {
    this.dataServices = this.serviceService.getService().subscribe((services: Service[]) => {
      this.services = services;
    });
  }

  ngOnDestroy(): void {
    this.dataServices.unsubscribe();
  }
}
