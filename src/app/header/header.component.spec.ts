import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  openRegisterDialog(): void {
    // Kayıt olma dialog'unu aç
    this.dialog.open(RegisterDialogComponent, {
      width: '300px'
    });
  }




  constructor(public dialog: MatDialog) {}

  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '300px'
    });
  }
}
