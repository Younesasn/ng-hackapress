import { Component } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { ProductsSectionComponent } from "./products-section/products-section.component";

@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrl: './products.component.css',
    imports: [HeroComponent, ProductsSectionComponent]
})
export class ProductsComponent {

}
