import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class Register {
  name = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (!this.name || !this.email || !this.password) {
      alert('All fields required');
      return;
    }
    this.auth.register({ name: this.name, email: this.email, password: this.password, role: 'user' }).subscribe({
      next: () => {
        alert('Registration successful! Please login');
        this.router.navigate(['/login']);
      },
      error: (err) => alert(err.error.message || 'Registration failed')
    });
  }
}
