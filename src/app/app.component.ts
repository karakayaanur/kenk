import { Component, OnInit } from '@angular/core';
import { MongoDbService } from './services/mongodb.service';
import { product } from './models/product';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        RouterModule,
        MatDialogModule, // MatDialogModule'ü imports dizisine ekleyin
        LoginDialogComponent, // Eğer LoginDialogComponent standalone ise buraya ekleyebilirsiniz
        RegisterDialogComponent,
        HeaderComponent,
    ]
})
export class AppComponent implements OnInit {
  constructor(
    private dialog: MatDialog, // MatDialog'ı doğru şekilde enjekte edin
    private readonly productCollection: MongoDbService<product>
  ) {
    productCollection.setCollectionName('products');
  }

  
  
  ngOnInit(): void {
    let price: number = 100;
    let product: product = {
      name: 'kalem',
      price: 5
    };
    this.productCollection.post(product).subscribe((cevap) => {
      console.log(cevap);
    });
  }
}
