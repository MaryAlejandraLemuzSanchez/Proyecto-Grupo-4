import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(
    private httpClient: HttpClient
  ){}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getProductos(){
    return this.httpClient.get('http://localhost:4000/productos/getall', { headers: this.getHeaders() });
  }

  crearProducto(producto: any){
    return this.httpClient.post('http://localhost:4000/productos/save', { 
      codigo: producto.codigo,
      nombre: producto.nombre,
      descripcion: producto.descripcion, 
      precio: producto.precio,
      stock_actual: producto.stock_actual,
      stock_minimo: producto.stock_minimo,
      categoria: producto.categoria,
      imagen_url: producto.imagen_url
    }, { headers: this.getHeaders() });
  }

  editarProducto(producto: any){
    return this.httpClient.put('http://localhost:4000/productos/update/' + producto.id, { 
      codigo: producto.codigo,
      nombre: producto.nombre,
      descripcion: producto.descripcion, 
      precio: producto.precio,
      stock_actual: producto.stock_actual,
      stock_minimo: producto.stock_minimo,
      categoria: producto.categoria,
      imagen_url: producto.imagen_url
    }, { headers: this.getHeaders() });
  }

  eliminarProducto(producto: any) {
    return this.httpClient.delete('http://localhost:4000/productos/delete/' + producto.id, { headers: this.getHeaders() });
  }
}
