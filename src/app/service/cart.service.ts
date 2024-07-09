import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartProduct } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = new BehaviorSubject<CartProduct[]>([]);
  cartItems$ = this.cartItems.asObservable();

  private url: string = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) {}

  loadCartItems(): Observable<CartProduct[]> {
    return this.http.get<CartProduct[]>(this.url).pipe(
      tap((items) => this.cartItems.next(items))
    );
  }

  addToCart(productId: number): Observable<any> {
    return this.http.post(`${this.url}/add/${productId}`, {}).pipe(
      tap(() => {
        this.loadCartItems().subscribe();
      })
    );
  }

  removeFromCart(productId: number): Observable<any> {
    
    return this.http.delete(`${this.url}/remove/${productId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.url}/clear`);
  }

}
