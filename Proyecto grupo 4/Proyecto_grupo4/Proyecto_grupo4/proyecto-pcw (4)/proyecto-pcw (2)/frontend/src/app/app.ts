import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(public router: Router) {}

  logout() {
    localStorage.removeItem('token');
    console.log('Sesión cerrada correctamente.');
    this.router.navigate(['/login']);
  }
}

