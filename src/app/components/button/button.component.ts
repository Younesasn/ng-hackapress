import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() link!: string;
  @Input() content!: string;
}
