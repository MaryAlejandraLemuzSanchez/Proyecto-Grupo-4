import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdenesService } from './ordenes.service';

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ordenes.html'
})
export class Ordenes implements OnInit {
  listadoOrdenes = signal<any[]>([]);
  ordenProveedorIdNuevo: number | null = null;
  ordenEstadoNuevo = 'Pendiente';
  nuevoEstadoSeleccionado = 'Pendiente';
  idOrdenEstado: number = 0;

  prodIdTemporal: number | null = null;
  prodCantTemporal: number | null = null;
  prodPrecioTemporal: number | null = null;

  constructor(private service: OrdenesService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.service.getAll().subscribe({
      next: (data) => this.listadoOrdenes.set(data),
      error: (err) => console.error(err)
    });
  }

  crearOrden(): void {
    const obj = {
      proveedor_id: this.ordenProveedorIdNuevo,
      estado: this.ordenEstadoNuevo,
      productos: [{ 
        producto_id: this.prodIdTemporal, 
        cantidad: this.prodCantTemporal, 
        precio_unitario: this.prodPrecioTemporal 
      }]
    };
    this.service.save(obj).subscribe({
      next: () => { 
        this.cargar(); 
        this.ordenProveedorIdNuevo = null; 
        this.ordenEstadoNuevo = 'Pendiente';
        this.prodIdTemporal = null;
        this.prodCantTemporal = null;
        this.prodPrecioTemporal = null;
      },
      error: (err) => console.error(err)
    });
  }

  llenarOrdenEstado(row: any): void {
    this.idOrdenEstado = row.id;
    this.nuevoEstadoSeleccionado = row.estado;
  }

  actualizarEstado(): void {
    this.service.updateEstado(this.idOrdenEstado, this.nuevoEstadoSeleccionado).subscribe({
      next: () => this.cargar(),
      error: (err) => console.error(err)
    });
  }
}
