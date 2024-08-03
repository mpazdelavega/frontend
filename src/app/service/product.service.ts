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
    return this.http.get<Product[]>(`${this.url}/with-stock`);
  }

  findAllPageable(page: number): Observable<any> {
    return this.http.get<any[]>(`${this.url}/page?page=${page}`);
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

  // New methods
  getProductsByCategoryWithStock(category: string): Observable<any[]> {
    return this.http.get<Product[]>(`${this.url}/with-stock-category?category=${category}`);
  }

  getProductsByCategoryAndGender(category: string, gender: string, page: number): Observable<any> {
    return this.http.get<any>(`${this.url}/by-category-gender?category=${category}&gender=${gender}&page=${page}`);
  }

  getProductsByBrand(brand: string, page: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/brand?brand=${brand}`);
  }

  getProductsFiltered(genders: string[], brands: string[], page: number): Observable<any> {
    const genderParam = genders.length > 0 ? `gender=${genders.join(',')}` : '';
    const brandParam = brands.length > 0 ? `brand=${brands.join(',')}` : '';
    const params = [genderParam, brandParam].filter(param => param).join('&');
    return this.http.get<any>(`${this.url}/filter-products?${params}&page=${page}`);
  }

}
