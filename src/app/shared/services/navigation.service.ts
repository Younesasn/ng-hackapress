import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private previousUrl: string | null = null;
  private currentUrl: string | null = null;
  router = inject(Router);
  
  constructor() {
    this.currentUrl = this.router.url;

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.url;
    });
  }

  getPreviousUrl() {
    return this.previousUrl;
  }

  getCurrentUrl() {
    return this.currentUrl;
  }
}
