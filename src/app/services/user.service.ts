import { BehaviorSubject, Observable, map } from "rxjs";
import { ServerResponse } from "../models/response";
import { MongoDbService } from "./mongodb.service";
import { cartItem, user } from "../models/collections";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'any' })
export class UserService {
    private readonly userService: MongoDbService<user> = new MongoDbService<user>();
    private readonly cartService: MongoDbService<cartItem> = new MongoDbService<cartItem>();
    private readonly _cartItems: BehaviorSubject<cartItem[]> = new BehaviorSubject<cartItem[]>([]);

    private readonly _user: user | undefined = undefined;

    constructor() {
        this.userService.setCollectionName('users');
        this.cartService.setCollectionName('cartItems');
        let userJson = localStorage.getItem('user');
        if (userJson) {
            this._user = JSON.parse(userJson);
            this.loadCartItems();
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
        return this.userService.getOne({
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
        return this.userService.post({
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

    private loadCartItems(): Observable<ServerResponse<cartItem[]>> {
        return this.cartService.get({
            userId: this._user ? this._user._id : undefined,
        }).pipe(map(response => {
            if (response.success && response.data) {
                this._cartItems.next(response.data);
            } else {
                this._cartItems.next([]);
            }
            return response;
        }));
    }
}