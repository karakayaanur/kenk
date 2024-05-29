import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { collection } from "../models/collections";
import { ServerResponse } from "../models/response";

// @Injectable({ providedIn: 'root' })
export class MongoDbService<T = collection> {
    private readonly baseUrl: string = 'http://127.0.0.1:3000/';
    private collectionName: string = '';
    private readonly client: HttpClient = inject(HttpClient);
    
    constructor() {
    }

    public get(filters: Object): Observable<ServerResponse<T[]>> {
        return this.client.get(this.baseUrl + this.collectionName + '/?filter=' + JSON.stringify(filters))
            .pipe(map((response) => {
                return <ServerResponse<T[]>>response;
            }));
    }

    public getById(_id: string): Observable<ServerResponse<T>> {
        return this.client.get(this.baseUrl + this.collectionName + '/users/?filter=' + JSON.stringify({ _id }))
            .pipe(map((response) => {
                return <ServerResponse<T>>response;
            }));
    }

    public getOne(filters: Object): Observable<ServerResponse<T>> {
        return this.client.get(this.baseUrl + this.collectionName + '/users/?filter=' + JSON.stringify(filters))
            .pipe(map((response) => {
                return <ServerResponse<T>>response;
            }));
    }

    public put(record: T): Observable<ServerResponse<T>> {
        return this.client.put(this.baseUrl + this.collectionName, record)
            .pipe(map((response) => {
                return <ServerResponse<T>>response;
            }));
    }

    public post(record: T): Observable<ServerResponse<T>> {
        return this.client.post(this.baseUrl + this.collectionName, record)
            .pipe(map((response) => {
                return <ServerResponse<T>>response;
            }));
    }

    public delete(record: T): Observable<ServerResponse<number>> {
        return this.client.delete(this.baseUrl + this.collectionName, { body: record })
            .pipe(map((response) => {
                return <ServerResponse<number>>response;
            }));
    }

    public setCollectionName(collectionName: string): void {
        this.collectionName = collectionName;
    }
}