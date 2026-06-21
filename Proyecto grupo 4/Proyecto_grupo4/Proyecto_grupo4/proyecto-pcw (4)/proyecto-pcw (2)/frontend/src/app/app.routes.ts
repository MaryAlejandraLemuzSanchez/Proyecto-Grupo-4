import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Productos } from './productos/productos';
import { Usuarios } from './usuarios/usuarios';
import { Proveedores } from './proveedores/proveedores';
import { Ordenes } from './ordenes/ordenes';
import { Reportes } from './reportes/reportes';
import { authGuard } from './auth-guard';
import { Home } from './home/home';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cliente.html', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: 'cliente', redirectTo: 'usuarios', pathMatch: 'full' },

  { path: 'productos', component: Productos, canActivate: [authGuard] },
  { path: 'usuarios', component: Usuarios, canActivate: [authGuard] },
  { path: 'proveedores', component: Proveedores, canActivate: [authGuard] },
  { path: 'ordenes', component: Ordenes, canActivate: [authGuard] },
  { path: 'reportes', component: Reportes, canActivate: [authGuard] },
  { path: 'home', component: Home, canActivate: [authGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

