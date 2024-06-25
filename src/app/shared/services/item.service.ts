import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Item } from '../entities';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemUrl: string = `${environment.apiURL}/items`;

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemUrl);
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.itemUrl}/${id}`);
  }

  setItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemUrl, item);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.itemUrl}/${item.id}`, item);
  }

  deleteItem(id: number): Observable<Item> {
    return this.http.delete<Item>(`${this.itemUrl}/${id}`);
  }
}
