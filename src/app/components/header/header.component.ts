import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';
import { cartItem, user } from '../../models/collections';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [CommonModule, FormsModule, DialogModule, ButtonModule]
})
export class HeaderComponent implements OnInit {
  public visibleSignIn: boolean = false;
  public visibleSignUp: boolean = false;
  public visibleCart: boolean = false;
  public isSignedIn: boolean = false;

  public user: user | undefined = undefined;
  public cartItems: cartItem[] = [];

  constructor(private readonly userService: UserService) { }

  public ngOnInit(): void {
    this.isSignedIn = this.userService.isSignedIn();
    this.user = this.userService.user;

    if (this.isSignedIn) {
      this.userService.loadCartItems();
    }

    this.userService.cartItems.subscribe(cartItemState => {
      if (!cartItemState) {
        return;
      }

      this.cartItems = cartItemState;
    });
  }

  public signIn(email: string, password: string): void {
    this.userService.signIn(email, password).subscribe(response => {
      if (response.success) {
        this.visibleSignIn = false;
        window.location.reload();
      } else {
        alert(response.message);
      }
    });
  }

  public signUp(name: string, surname: string, email: string, password: string): void {
    this.userService.signUp(name, surname, email, password).subscribe(response => {
      if (response.success) {
        this.visibleSignUp = false;
        window.location.reload();
      } else {
        alert(response.message);
      }
    });
  }

  public signOut(): void {
    this.userService.signOut();
  }

  public checkout(): void {

  }
}