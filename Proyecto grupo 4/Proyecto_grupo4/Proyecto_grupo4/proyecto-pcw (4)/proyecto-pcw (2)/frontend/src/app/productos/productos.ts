import { Component, signal } from '@angular/core';
import { ProductosService } from './productos.service';
import { take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos {
  protected readonly title = signal('Listado de productos');
  public listadoProductos: any = signal([]);

  public codigoNuevo: string = "";
  public nombreNuevo: string = "";
  public descripcionNuevo: string = "";
  public precioNuevo: string = "";
  public stockActualNuevo: string = "";
  public stockMinimoNuevo: string = "";
  public categoriaNuevo: string = "";
  public imagenUrlNuevo: string = "";

  public idEditar: any = "";
  public codigoEditar: string = "";
  public nombreEditar: string = "";
  public descripcionEditar: string = "";
  public precioEditar: string = "";
  public stockActualEditar: string = "";
  public stockMinimoEditar: string = "";
  public categoriaEditar: string = "";
  public imagenUrlEditar: string = "";

  public id_productoEliminar: string = "";

  constructor(
    private productosService: ProductosService
  ){
    this.listadoProductos.set([]);
    this.getProductos();
  }

  getProductos(){
    console.log("Obteniendo Productos...");
    this.productosService.getProductos().pipe(take(1)).subscribe((data: any)=> {
      console.log('data', data);
      this.listadoProductos.set(data);
    });
  }

  crearProducto(){
    const nuevoProducto = {
      codigo: this.codigoNuevo,
      nombre: this.nombreNuevo,
      descripcion: this.descripcionNuevo,
      precio: parseFloat(this.precioNuevo),
      stock_actual: parseInt(this.stockActualNuevo) || 0,
      stock_minimo: parseInt(this.stockMinimoNuevo) || 0,
      categoria: this.categoriaNuevo,
      imagen_url: this.imagenUrlNuevo || "imagenes/martillo.jpg"
    };

    this.productosService.crearProducto(nuevoProducto).pipe(take(1)).subscribe((res: any) => {
      this.getProductos();
      this.codigoNuevo = "";
      this.nombreNuevo = "";
      this.descripcionNuevo = "";
      this.precioNuevo = "";
      this.stockActualNuevo = "";
      this.stockMinimoNuevo = "";
      this.categoriaNuevo = "";
      this.imagenUrlNuevo = "";
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
      document.body.style.overflow = 'auto';
    });
  }

  llenarProductosEditar(producto: any){
    this.idEditar = producto.id;
    this.codigoEditar = producto.codigo;
    this.nombreEditar = producto.nombre;
    this.descripcionEditar = producto.descripcion;
    this.precioEditar = producto.precio;
    this.stockActualEditar = producto.stock_actual;
    this.stockMinimoEditar = producto.stock_minimo;
    this.categoriaEditar = producto.categoria;
    this.imagenUrlEditar = producto.imagen_url;
  }

  editarProducto(){
    const objetoParaServicio = {
      id: this.idEditar,
      codigo: this.codigoEditar,
      nombre: this.nombreEditar,
      descripcion: this.descripcionEditar,
      precio: parseFloat(this.precioEditar),
      stock_actual: parseInt(this.stockActualEditar) || 0,
      stock_minimo: parseInt(this.stockMinimoEditar) || 0,
      categoria: this.categoriaEditar,
      imagen_url: this.imagenUrlEditar
    };

    this.productosService.editarProducto(objetoParaServicio).pipe(take(1)).subscribe((res: any) => {
      this.getProductos(); 
      this.idEditar = "";
      this.codigoEditar = "";
      this.nombreEditar = "";
      this.descripcionEditar = "";
      this.precioEditar = "";
      this.stockActualEditar = "";
      this.stockMinimoEditar = "";
      this.categoriaEditar = "";
      this.imagenUrlEditar = "";
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
      document.body.style.overflow = 'auto';
    });
  }

  eliminarProducto() {
    const objetoParaServicio = {
      id: parseInt(this.id_productoEliminar)
    };

    this.productosService.eliminarProducto(objetoParaServicio).pipe(take(1)).subscribe((res: any) => {
      this.getProductos(); 
      this.id_productoEliminar = "";
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
      document.body.style.overflow = 'auto';
    });
  }
}
