import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-validate',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './validate.component.html',
})
export class ValidateComponent {

  order: string = localStorage.getItem('order') || '';

  router = inject(Router);

  ngOnInit(): void {
    if (this.order === '') {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('order');
  }
}
