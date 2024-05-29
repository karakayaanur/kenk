import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { cartItem } from '../../models/collections';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './carts.component.html',
  imports: [CommonModule, FormsModule, DialogModule],
  standalone: true,
})
export class CartComponent implements OnInit {
  cartItems: cartItem[] = [];
  display: boolean = false;

  constructor(private readonly userService: UserService) { }

  public ngOnInit(): void {
    this.userService.cartItems.subscribe(cartItemState => {
      if (!cartItemState) {
        return;
      }

      this.cartItems = cartItemState;
    });
  }

  public openCart(): void {
    this.display = true;
  }

  public closeCart(): void {
    this.display = false;
  }

  public checkout(): void {

  }
}
