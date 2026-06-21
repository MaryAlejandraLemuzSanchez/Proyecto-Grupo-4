import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  private apiUrl = 'http://localhost:4000/ordenes';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getall`, { headers: this.getHeaders() });
  }

  save(orden: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, orden, { headers: this.getHeaders() });
  }

  updateEstado(id: number, nuevoEstado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-estado/${id}`, { nuevo_estado: nuevoEstado }, { headers: this.getHeaders() });
  }
}
