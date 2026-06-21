import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(
    private httpClient: HttpClient
  ){}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUsuarios(){
    return this.httpClient.get('http://localhost:4000/usuarios/getall', { headers: this.getHeaders() });
  }

  crearUsuario(usuario: any){
    return this.httpClient.post('http://localhost:4000/usuarios/save', { 
      nombre: usuario.nombre, 
      email: usuario.email, 
      password: usuario.password,
      rol: usuario.rol
    }, { headers: this.getHeaders() });
  }

  editarUsuario(usuario: any){
    return this.httpClient.put('http://localhost:4000/usuarios/update/' + usuario.id, { 
      nombre: usuario.nombre, 
      email: usuario.email, 
      password: usuario.password,
      rol: usuario.rol
    }, { headers: this.getHeaders() });
  }

  eliminarUsuario(usuario: any) {
    return this.httpClient.delete('http://localhost:4000/usuarios/delete/' + usuario.id, { headers: this.getHeaders() });
  }
}
