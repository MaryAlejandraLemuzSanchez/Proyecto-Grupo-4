import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = 'http://localhost:4000/reportes';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getTotales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/totales`, { headers: this.getHeaders() });
  }

  getStockBajo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stock-bajo`, { headers: this.getHeaders() });
  }
}
