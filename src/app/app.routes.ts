import { Routes } from '@angular/router';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

export const routes: Routes = [
    { path: 'login', component: LoginDialogComponent },
    { path: 'register', component: RegisterDialogComponent },
];
