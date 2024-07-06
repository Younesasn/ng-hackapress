import { Component, Inject, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from "../components/button/button.component";
import { User } from '../shared/entities';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    imports: [RouterLink, ButtonComponent, CommonModule]
})
export class HeaderComponent {
  @Input() user?: User;
}
