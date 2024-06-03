// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { DialogModule } from 'primeng/dialog';
// import { ButtonModule } from 'primeng/button';
// import { MongoDbService } from '../../services/mongodb.service';
// import { cartItem, product } from '../../models/collections';
// import { UserService } from '../../services/user.service';


// @Component({
//   selector: 'app-products',
//   standalone: true,
//   templateUrl: './products.component.html',
//   imports: [CommonModule, FormsModule, DialogModule, ButtonModule]
// })
// export class ProductsComponent implements OnInit {
//   private readonly productService: MongoDbService<product> = new MongoDbService<product>();

//   public isSignedIn: boolean = false;

//   public products: product[] = [];
//   public cartItems: cartItem[] = [];

//   constructor(public readonly userService: UserService) { }

//   public ngOnInit(): void {
//     this.productService.setCollectionName('products');

//     this.isSignedIn = this.userService.isSignedIn();

   
//     this.productService.get({}).subscribe({
//       next: (response) => {
//         if (response.success) {
//           this.products = response.data;
//         } else {
//           console.error('Failed to fetch products:', response.message);
//         }
//       },
//       error: (error) => {
//         console.error('Error fetching products:', error);
//       }
//     });

//     this.userService.cartItems.subscribe(cartItemState => {
//       if (!cartItemState) {
//         return;
//       }

//       this.cartItems = cartItemState;
//     });

    
//   }


  

//   public isAddedProduct(product: product): boolean {
//     return !!this.cartItems.find(cartItem => cartItem.productId === product._id);
//   }

//    public addToCart(product: product): void {
//      this.userService.addCartItem(product).subscribe({
//        next: (response) => {
//          if (response.success) {
//         } else {
//            console.error('Failed to add product to cart:', response.message);
//          }
//        },
//        error: (error) => {
//          console.error('Error adding product to cart:', error);
//        }
//      });
//    }

   

 
 
 

//    public removeToCart(product: product): void {
//      const cartItem: cartItem = this.cartItems.find(cartItem => cartItem.productId !== product._id)!;
//      this.userService.removeCartItem(cartItem).subscribe({
//        next: (response) => {
//          if (response.success) {
//        } else {
//         console.error('Failed to remove product from cart:', response.message);
//         }
//        },
//       error: (error) => {
//         console.error('Error removing product from cart:', error);
//      }
//     });
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MongoDbService } from '../../services/mongodb.service';
import { cartItem, product } from '../../models/collections';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  imports: [CommonModule, FormsModule, DialogModule, ButtonModule]
})
export class ProductsComponent implements OnInit {
  private readonly productService: MongoDbService<product>;

  public isSignedIn: boolean = false;
  public products: product[] = [];
  public cartItems: cartItem[] = [];

  constructor(public readonly userService: UserService) {
    this.productService = new MongoDbService<product>();
    this.productService.setCollectionName('products');
  }

  public ngOnInit(): void {
    this.loadProducts();
    this.isSignedIn = this.userService.isSignedIn();
    this.userService.cartItems.subscribe(cartItemState => {
      if (cartItemState) {
        this.cartItems = cartItemState;
      }
    });
  }

  loadProducts(): void {
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
    });""
  }

  public isAddedProduct(product: product): boolean {
    return !!this.cartItems.find(cartItem => cartItem.productId === product._id);
  }

  public addToCart(product: product): void {
    if (!this.isSignedIn) {
      alert("Please sign in to add items to the cart.");
      return;
    }
    this.userService.addCartItem(product).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Item added to cart');
        } else {
          console.error('Failed to add product to cart:', response.message);
        }
      },
      error: (error) => {
        console.error('Error adding product to cart:', error);
      }
    });
  }

  public removeToCart(product: product): void {
    const cartItem = this.cartItems.find(item => item.productId === product._id);
    if (cartItem) {
      this.userService.removeCartItem(cartItem).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Item removed from cart');
          } else {
            console.error('Failed to remove product from cart:', response.message);
          }
        },
        error: (error) => {
          console.error('Error removing product from cart:', error);
        }
      });
    }
  }
}
