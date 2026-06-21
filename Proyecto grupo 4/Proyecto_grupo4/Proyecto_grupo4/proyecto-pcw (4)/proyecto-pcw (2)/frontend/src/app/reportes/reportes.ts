import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesService } from './reportes.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.html'
})
export class Reportes implements OnInit {
  listadoStockBajo = signal<any[]>([]);
  datosDashboard = signal<any>({ totales: { productos: 0, proveedores: 0, ordenes: 0 } });

  constructor(private service: ReportesService) {}

  ngOnInit(): void {
    this.cargarTotales();
    this.cargarReporteStockBajo();
  }

  cargarTotales(): void {
    this.service.getTotales().subscribe({
      next: (data) => this.datosDashboard.set(data),
      error: (err) => console.error(err)
    });
  }

  cargarReporteStockBajo(): void {
    this.service.getStockBajo().subscribe({
      next: (data) => this.listadoStockBajo.set(data),
      error: (err) => console.error(err)
    });
  }
}
