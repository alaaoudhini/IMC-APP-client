import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
    private titleService: Title
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Use Validators.email to validate email format
      password: ['', Validators.required],
    });

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
  
    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
  
    this.http.post('http://localhost:8000/api/login', data).subscribe(
      (response: any) => {
        console.log('Logged in successfully', response);
  
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar'],
        });
  
        // Check user's role and redirect accordingly
        if (response.user.role === 'admin') { // Make sure to access the role as response.user.role
          // Redirect to admin panel
          this.router.navigate(['/admin/users']);
        } else {
          // Redirect to another page for non-admin users
          this.router.navigate(['/']); // Replace 'dashboard' with the appropriate route
        }
      },
      (error) => {
        //console.error('Error logging in:', error);
  
        this.snackBar.open('An error occurred while logging in.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }
  
}
