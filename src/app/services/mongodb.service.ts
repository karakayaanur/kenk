import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, filter, from, map, switchMap } from "rxjs";
import { collection } from "../models/collections";
import { ServerResponse } from "../models/response";

// @Injectable({ providedIn: 'root' })
// export class MongoDbService<T = collection> {
//     private readonly baseUrl: string = 'http://127.0.0.1:3000/';
//     private collectionName: string = '';
//     private readonly client: HttpClient = inject(HttpClient);

//     public get(filters: Object): Observable<ServerResponse<T[]>> {
//         return from(fetch(this.baseUrl + this.collectionName + '?filter=' + JSON.stringify(filters), {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         })).pipe(
//             filter(result => result.ok),
//             switchMap(result => result.json()),
//             map(json => <ServerResponse<T[]>>json),
//         );
//     }

//     public getById(_id: string): Observable<ServerResponse<T>> {
//         return this.client.get(this.baseUrl + this.collectionName + '/first?filter=' + JSON.stringify({ _id }))
//             .pipe(map((response) => {
//                 return <ServerResponse<T>>response;
//             }));
//     }

//     public getOne(filters: Object): Observable<ServerResponse<T>> {
//         return this.client.get(this.baseUrl + this.collectionName + '/first?filter=' + JSON.stringify(filters))
//             .pipe(map((response) => {
//                 return <ServerResponse<T>>response;
//             }));
//     }

//     public put(record: T): Observable<ServerResponse<T>> {
//         return this.client.put(this.baseUrl + this.collectionName, record)
//             .pipe(map((response) => {
//                 return <ServerResponse<T>>response;
//             }));
//     }

//     public post(record: T): Observable<ServerResponse<T>> {
//         return this.client.post(this.baseUrl + this.collectionName, record)
//             .pipe(map((response) => {
//                 return <ServerResponse<T>>response;
//             }));
//     }

//     public delete(record: T): Observable<ServerResponse<number>> {
//         return this.client.delete(this.baseUrl + this.collectionName, { body: record })
//             .pipe(map((response) => {
//                 return <ServerResponse<number>>response;
//             }));
//     }

//     public setCollectionName(collectionName: string): void {
//         this.collectionName = collectionName;
//     }
// }

export class MongoDbService<T = collection> {
    private readonly baseUrl: string = 'http://127.0.0.1:3000/';
    private collectionName: string = '';

    public get(filters: Object): Observable<ServerResponse<T[]>> {
        return from(fetch(`${this.baseUrl}${this.collectionName}?filter=${JSON.stringify(filters)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })).pipe(
            switchMap(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }),
            map(json => <ServerResponse<T[]>>json)
        );
    }

    public getById(_id: string): Observable<ServerResponse<T>> {
        return from(fetch(`${this.baseUrl}${this.collectionName}/first?filter=${JSON.stringify({ _id })}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })).pipe(
            switchMap(response => response.json()),
            map(json => <ServerResponse<T>>json)
        );
    }

    public getOne(filters: Object): Observable<ServerResponse<T>> {
        return from(fetch(`${this.baseUrl}${this.collectionName}/first?filter=${JSON.stringify(filters)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })).pipe(
            switchMap(response => response.json()),
            map(json => <ServerResponse<T>>json)
        );
    }

    public put(record: T): Observable<ServerResponse<T>> {
        return from(fetch(`${this.baseUrl}${this.collectionName}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record)
        })).pipe(
            switchMap(response => response.json()),
            map(json => <ServerResponse<T>>json)
        );
    }

    public post(record: T): Observable<ServerResponse<T>> {
        return from(fetch(`${this.baseUrl}${this.collectionName}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record)
        })).pipe(
            switchMap(response => response.json()),
            map(json => <ServerResponse<T>>json)
        );
    }

    public delete(record: T): Observable<ServerResponse<number>> {
        return from(fetch(`${this.baseUrl}${this.collectionName}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record)
        })).pipe(
            switchMap(response => response.json()),
            map(json => <ServerResponse<number>>json)
        );
    }
            //
    public getProducts(): Observable<ServerResponse<T>> {
        return from(fetch(`${this.baseUrl}${this.collectionName}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })).pipe(
            switchMap(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }),
            map(json => <ServerResponse<T>>json)
        );
    }

    
    public setCollectionName(collectionName: string): void {
        this.collectionName = collectionName;
    }
}
