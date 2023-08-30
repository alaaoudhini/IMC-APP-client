import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private fb: FormBuilder, 
    private router: Router,
    private titleService: Title,
    private userService: UserService 
  ) 
  { this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]], 
    password: ['', Validators.required],
  });}

  ngOnInit() {
   

    // Set the title of the page
    this.titleService.setTitle('Login');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      return;
    }
  
    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
  
    // Assuming you have a function to get the authentication token, e.g., getAuthToken()
    const authToken = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${authToken}`
    };
  
    this.userService.login(headers, credentials).subscribe(
      (response: any) => {
        console.log('Logged in successfully', response);
        localStorage.setItem('token', response.token);

        const userId = response.user.id;
        localStorage.setItem('userId', userId);
  
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar'],
        });
  
        // Check user's role and redirect accordingly
        if (response.user.role === 'admin') {
          // Redirect to admin panel
          this.router.navigate(['/admin/users']);
        } else {
          // Redirect to another page for non-admin users
          this.router.navigate(['imc/calcul-IMC']); // Replace 'dashboard' with the appropriate route
        }
      },
      (error) => {
        console.error('Error logging in:', error);
  
        this.snackBar.open('An error occurred while logging in.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }
  
}
