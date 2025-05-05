import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-login',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  username: string=''
  password: string=''


  private readonly adminUsername: string= 'admin';
  private readonly adminPassword: string='password';

  constructor(private router:Router) {}

  onLogin(): void {
    if(this.username == this.adminUsername && this.password == this.adminPassword) {
      localStorage.setItem('isLoggedIn','true')
      this.router.navigate(['/admin/dashboard'])
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "არასწორია!",
        background: "#1d1819",
        color: "#f5f5dc",
        iconColor: "red",
        confirmButtonColor: "#808080"
      })
      localStorage.removeItem('isLoggedIn')
    }
  }
}
