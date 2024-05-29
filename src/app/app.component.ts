import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from "./components/products/products.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [
        HeaderComponent,
        ProductsComponent
    ]
})
export class AppComponent { 
 }