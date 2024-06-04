import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, filter, from, map, switchMap } from "rxjs";
import { collection } from "../models/collections";
import { ServerResponse } from "../models/response";

export class MongoDbService<T = collection> {
    private readonly baseUrl: string = 'http://127.0.0.1:3000/';
    private collectionName: string = '';
    private readonly client: HttpClient = inject(HttpClient);

    public get(filters: Object): Observable<ServerResponse<T[]>> {
        return from(fetch(this.baseUrl + this.collectionName + '?filter=' + JSON.stringify(filters), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })).pipe(
            switchMap(result => result.json()),
            map(json => <ServerResponse<T[]>>json),
        );
    }

    public getById(_id: string): Observable<ServerResponse<T>> {
        return this.client.get(this.baseUrl + this.collectionName + '/first?filter=' + JSON.stringify({ _id }))
            .pipe(map((response) => {
                return <ServerResponse<T>>response;
            }));
    }

    public getOne(filters: Object): Observable<ServerResponse<T>> {
        return this.client.get(this.baseUrl + this.collectionName + '/first?filter=' + JSON.stringify(filters))
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

    public delete(filters: Object): Observable<ServerResponse<number>> {
        return from(fetch(this.baseUrl + this.collectionName + '?filter=' + JSON.stringify(filters), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })).pipe(
            switchMap(result => result.json()),
            map(json => <ServerResponse<number>>json),
        );
    }

    public deleteById(_id: string): Observable<ServerResponse<number>> {
        return this.client.delete(this.baseUrl + this.collectionName + '?filter=' + JSON.stringify({ _id }))
            .pipe(map((response) => {
                return <ServerResponse<number>>response;
            }));
    }

    public setCollectionName(collectionName: string): void {
        this.collectionName = collectionName;
    }
}
