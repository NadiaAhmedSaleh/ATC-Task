import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})


export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';


  constructor(private router: Router , private auth: AuthService) {}

  login(){

     if (!this.email || !this.password) {
      this.error = 'Email and password are required.';
      return;
    }

    this.error = '';
    this.loading = true;

    this.auth.login({email:this.email, password:this.password}).subscribe({
        next:(res)=>{
            this.loading = false;
            localStorage.setItem('token' , res.token)
            this.router.navigate(['/dashboard']);
            
        },
        error: (err) => {
        this.loading = false;
        this.error = err?.error?.message ?? 'Login failed check credentials.';
      }
    });

  }
}
