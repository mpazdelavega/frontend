import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartProduct } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  // cartItems$ = this.cartItemsSubject.asObservable();

  private url: string = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) {}

  loadCartItems(): Observable<CartProduct[]> {
    return this.http.get<CartProduct[]>(this.url);
  }

  addToCart(productId: number): Observable<any> {
    return this.http.post(`${this.url}/add/${productId}`, {});
  }

  removeFromCart(productId: number): Observable<any> {
    
    return this.http.delete(`${this.url}/remove/${productId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.url}/clear`);
  }

}
