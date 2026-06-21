import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProveedoresService } from './proveedores.service';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proveedores.html'
})
export class Proveedores implements OnInit {
  listadoProveedores = signal<any[]>([]);
  idProveedorEliminar: number = 0;

  proveedorNombreNuevo = '';
  proveedorContactoNuevo = '';
  proveedorTelefonoNuevo = '';
  proveedorEmailNuevo = '';
  proveedorDireccionNuevo = '';

  proveedorNombreEditar = '';
  proveedorContactoEditar = '';
  proveedorTelefonoEditar = '';
  proveedorEmailEditar = '';
  proveedorDireccionEditar = '';
  idProveedorEditar: number = 0;

  constructor(private service: ProveedoresService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.service.getAll().subscribe({
      next: (data) => this.listadoProveedores.set(data),
      error: (err) => console.error(err)
    });
  }

  crearProveedor(): void {
    const obj = { 
      nombre: this.proveedorNombreNuevo, 
      contacto: this.proveedorContactoNuevo, 
      telefono: this.proveedorTelefonoNuevo, 
      email: this.proveedorEmailNuevo, 
      direccion: this.proveedorDireccionNuevo 
    };
    this.service.save(obj).subscribe({
      next: () => { 
        this.cargar(); 
        this.proveedorNombreNuevo = ''; 
        this.proveedorContactoNuevo = ''; 
        this.proveedorTelefonoNuevo = '';
        this.proveedorEmailNuevo = '';
        this.proveedorDireccionNuevo = '';
      },
      error: (err) => console.error(err)
    });
  }

  llenarProveedorEditar(row: any): void {
    this.idProveedorEditar = row.id;
    this.proveedorNombreEditar = row.nombre;
    this.proveedorContactoEditar = row.contacto;
    this.proveedorTelefonoEditar = row.telefono;
    this.proveedorEmailEditar = row.email;
    this.proveedorDireccionEditar = row.direccion;
  }

  editarProveedor(): void {
    const obj = { 
      nombre: this.proveedorNombreEditar, 
      contacto: this.proveedorContactoEditar, 
      telefono: this.proveedorTelefonoEditar, 
      email: this.proveedorEmailEditar, 
      direccion: this.proveedorDireccionEditar 
    };
    this.service.update(this.idProveedorEditar, obj).subscribe({
      next: () => this.cargar(),
      error: (err) => console.error(err)
    });
  }

  eliminarProveedor(): void {
    this.service.delete(this.idProveedorEliminar).subscribe({
      next: () => this.cargar(),
      error: (err) => console.error(err)
    });
  }
}
