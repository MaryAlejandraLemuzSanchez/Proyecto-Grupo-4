import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  public email = '';
  public password = '';

  constructor(
    private http: HttpClient, 
    private router: Router
  ) {}

 onLogin() {
  console.log('Datos que Angular va a enviar:', { email: this.email, password: this.password });

  const credenciales = {
    email: this.email,
    password: this.password
  };
    
    this.http.post('http://localhost:4000/usuarios/login', credenciales)
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          if (res && res.token) {
            localStorage.setItem('token', res.token);
            console.log('¡Login correcto! Token almacenado.');
            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          alert('Credenciales incorrectas o problemas de conexión');
        }
      });
  }
}
