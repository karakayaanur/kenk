import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component'; // Düzgün bir şekilde import edin
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    LoginDialogComponent,
    RegisterDialogComponent  // Düzgün bir şekilde ekleyin
  ]
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '250px'
    });
  }

  openRegisterDialog(): void {
    // Kayıt olma dialog'unu aç
    this.dialog.open(RegisterDialogComponent, {
      width: '300px'
    });
  }
}
