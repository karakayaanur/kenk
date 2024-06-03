import { BehaviorSubject, Observable, map } from "rxjs";
import { ServerResponse } from "../models/response";
import { MongoDbService } from "./mongodb.service";
import { cartItem, product, user } from "../models/collections";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'any' })
export class UserService {
    private readonly userDb: MongoDbService<user> = new MongoDbService<user>();
    private readonly cartDb: MongoDbService<cartItem> = new MongoDbService<cartItem>();
    private readonly _cartItems: BehaviorSubject<cartItem[]> = new BehaviorSubject<cartItem[]>([]);

    private readonly _user: user | undefined = undefined;

    constructor() {
        this.userDb.setCollectionName('users');
        this.cartDb.setCollectionName('cartItems');
        let userJson = localStorage.getItem('user');
        if (userJson) {
            this._user = JSON.parse(userJson);
        }
    }

    public get user(): user | undefined {
        return this._user;
    }

    public get cartItems(): Observable<cartItem[]> {
        return this._cartItems.asObservable();
    }

    public isSignedIn(): boolean {
        return !!this._user;
    }

    public signIn(email: string, password: string): Observable<ServerResponse<user>> {
        return this.userDb.getOne({
            email: email,
            password: password,
        }).pipe(map(response => {
            if (response.success && response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response;
        }));
    }

    public signUp(name: string, surname: string, email: string, password: string): Observable<ServerResponse<user>> {
        return this.userDb.post({
            name: name,
            surname: surname,
            email: email,
            password: password,
        }).pipe(map(response => {
            if (response.success && response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response;
        }));
    }

    public signOut(): void {
        localStorage.removeItem('user');
        window.location.reload();
    }

    public getCurrentUserId(): string | undefined {
        return this._user ? this._user._id : undefined;
    }

    public loadCartItems(): Observable<ServerResponse<cartItem[]>> {
        return this.cartDb.get({
            userId: this._user ? this._user._id : undefined,
        }).pipe(map(response => {
            console.log(response);
            if (response.success && response.data) {
                this._cartItems.next(response.data);
            } else {
                this._cartItems.next([]);
            }
            return response;
        }));
    }

     public addCartItem(product: product): Observable<ServerResponse<cartItem>> {
         return this.cartDb.post({
            userId: this._user!._id!,
             productId: product!._id!,
            name: product!.name!,
             price: product!.price!,
             description: product!.description!,
             image: product!.image!,
         }).pipe(map(response => {
             if (response.success && response.data) {
                 this.loadCartItems();
             } else {
                 console.log(response.message);
             }
             return response;
         }));
     }

 
   
    public removeCartItem(cartItem: cartItem): Observable<ServerResponse<number>> {
        return this.cartDb.delete(cartItem).pipe(map(response => {
            if (response.success && response.data) {
                this.loadCartItems();
            } else {
                console.log(response.message);
            }
            return response;
        }));
    }
}