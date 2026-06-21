import { Component, signal } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {
  protected readonly title = signal('Listado de Clientes');
  public listadoUsuarios: any = signal([]);

  public nombreNuevo: string = "";
  public correoNuevo: string = "";
  public passwordNuevo: string = "";
  public rolNuevo: string = "Empleado";

  public idEditar: any = ""; 
  public nombreEditar: string = "";
  public correoEditar: string = "";
  public passwordEditar: string = "";
  public rolEditar: string = "Empleado";

  public id_usuarioEliminar: any = ""; 

  constructor(
    private usuariosService: UsuariosService
  ){
    this.listadoUsuarios.set([]);
    this.getUsuarios();
  }

  getUsuarios(){
    console.log("Obteniendo Usuarios...");
    this.usuariosService.getUsuarios().pipe(take(1)).subscribe({
      next: (data: any) => {
        console.log('¡Datos recibidos con éxito!', data);
        this.listadoUsuarios.set(data);
      },
      error: (error: any) => {
        console.error('ERROR CRÍTICO EN LA PETICIÓN:', error);
      }
    });
  }

  crearUsuario(){
    const nuevoUsuario = {
      nombre: this.nombreNuevo,
      email: this.correoNuevo,
      password: this.passwordNuevo,
      rol: this.rolNuevo
    };
    
    this.usuariosService.crearUsuario(nuevoUsuario).pipe(take(1)).subscribe((res: any) => {
      this.getUsuarios();
      this.nombreNuevo = "";
      this.correoNuevo = "";
      this.passwordNuevo = "";
      this.rolNuevo = "Empleado";
    });
  }

  llenarUsuariosEditar(usuario: any){
    this.idEditar = usuario.id;
    this.nombreEditar = usuario.nombre;
    this.correoEditar = usuario.email;
    this.passwordEditar = usuario.password;
    this.rolEditar = usuario.rol;
  }

  actualizarUsuario(){
    const objetoParaServicio = {
      id: this.idEditar,
      nombre: this.nombreEditar,
      email: this.correoEditar,
      password: this.passwordEditar,
      rol: this.rolEditar
    };
  
    this.usuariosService.editarUsuario(objetoParaServicio).pipe(take(1)).subscribe((res: any) => {
      this.getUsuarios(); 
      this.idEditar = "";
      this.nombreEditar = "";
      this.correoEditar = "";
      this.passwordEditar = "";
      this.rolEditar = "Empleado";
    });   
  }

  eliminarUsuario() {
    const objetoParaServicio = {
      id: parseInt(this.id_usuarioEliminar) 
    };

    this.usuariosService.eliminarUsuario(objetoParaServicio).pipe(take(1)).subscribe((res: any) => {
      this.getUsuarios(); 
      this.id_usuarioEliminar = "";
    });
  }
}
