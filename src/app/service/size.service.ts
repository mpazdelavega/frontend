import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Size } from '../model/size';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  private url: string = 'http://localhost:8080/api/size';

  constructor(private http: HttpClient) { }
  
  getSizes(): Observable<Size[]> {
    return this.http.get<Size[]>(this.url);
  }

}
