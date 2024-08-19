import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { OneItem } from '../entities';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemUrl: string = `${environment.apiURL}/items`;

  constructor(private http: HttpClient) {}

  getItems(): Observable<OneItem[]> {
    return this.http.get<OneItem[]>(this.itemUrl);
  }

  getItemByUri(uri: string): Observable<OneItem> {
    return this.http.get<OneItem>(`${environment.url}${uri}`);
  }

  setItem(item: OneItem): Observable<OneItem> {
    return this.http.post<OneItem>(this.itemUrl, item);
  }

  // updateItem(item: OneItem): Observable<OneItem> {
  //   return this.http.put<OneItem>(`${this.itemUrl}/${item.id}`, item);
  // }

  deleteItem(id: number): Observable<OneItem> {
    return this.http.delete<OneItem>(`${this.itemUrl}/${id}`);
  }
}
