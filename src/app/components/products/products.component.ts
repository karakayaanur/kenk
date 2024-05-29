import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MongoDbService } from '../../services/mongodb.service';
import { product } from '../../models/collections';


@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    imports: [CommonModule, FormsModule, DialogModule,ButtonModule]
  })
  export class ProductsComponent implements OnInit {
    private readonly productService: MongoDbService<product> = new MongoDbService<product>();
    public products: product[] = [];
  
    ngOnInit(): void {
      this.productService.setCollectionName('products'); 
      this.productService.get({}).subscribe({
        next: (response) => {
          if (response.success) {
            this.products = response.data;
          } else {
            console.error('Failed to fetch products:', response.message);
          }
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        }
      });
    }
  }