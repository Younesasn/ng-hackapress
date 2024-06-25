import { Component, Inject, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from "../button/button.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    imports: [RouterLink, ButtonComponent]
})
export class HeaderComponent {
  
}
