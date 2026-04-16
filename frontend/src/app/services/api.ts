import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private http: HttpClient) {}
  getDiet() {
    return this.http.get('http://localhost:3000/diet');
  }
}
