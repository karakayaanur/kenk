import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { collection } from "../models/collection";

@Injectable({ providedIn: 'root' })
export class MongoDbService<T = collection> {
    private readonly baseUrl: string = 'http://127.0.0.1:3000/';
    private collectionName: string = '';

    constructor(private readonly client: HttpClient) {
    }

    public get(): Observable<T[]> {
        return this.client.get(this.baseUrl + this.collectionName, {})
            .pipe(map((response) => {
                return <T[]>response;
            }));
    }

    public put(record: T): Observable<any> {
        return this.client.put(this.baseUrl + this.collectionName, record)
            .pipe(map((response) => {
                return response;
            }));
    }

    public post(record: T): Observable<any> {
        return this.client.post(this.baseUrl + this.collectionName, record)
            .pipe(map((response) => {
                return response;
            }));
    }

    public delete(query: any): Observable<any> {
        return this.client.request('delete', this.baseUrl + this.collectionName, { body: query })
            .pipe(map((response) => {
                return response;
            }));
    }

    public setCollectionName(collectionName: string): void {
        this.collectionName = collectionName;
    }
}