import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/users';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Fixed 'styleUrl' to 'styleUrls'
})
export class LoginComponent implements OnInit {
  public formError: string = '';
  credentials = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'Email and password are required. Please try again.';
      return;
    }
    this.doLogin();
  }

  private doLogin(): void {
    const user: User = {
      email: this.credentials.email,
      name: '', // Optional if not required by your backend
    };

    this.authenticationService.login(user, this.credentials.password).subscribe({
      next: () => {
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate(['']); // Navigate to the home page
        } else {
          this.formError = 'Login failed. Please check your credentials.';
        }
      },
      error: (err: any) => {
        console.error('Login failed:', err);
        this.formError = 'An error occurred during login. Please try again.';
      },
    });
  }
}