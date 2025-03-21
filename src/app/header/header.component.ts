import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../components/button/button.component';
import { User } from '../shared/entities';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [RouterLink, CommonModule],
})
export class HeaderComponent {
  @Input() user?: User;
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
