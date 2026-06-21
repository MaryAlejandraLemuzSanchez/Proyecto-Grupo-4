import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  private apiUrl = 'http://localhost:4000/proveedores';

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

  save(proveedor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, proveedor, { headers: this.getHeaders() });
  }

  update(id: number, proveedor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, proveedor, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getHeaders() });
  }
}

