import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //private product: Product[] = [];

  private url: string = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  findAllPageable(page: number): Observable<any> {
    return this.http.get<any[]>(`${this.url}/page/${page}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  getProductsByCategoryHome(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/filter?category=${category}`);
  }

  getProductsByCategory(category: string, page: number): Observable<any> {
    return this.http.get<Product[]>(`${this.url}/filter2?category=${category}&page=${page}`);
  }

}
