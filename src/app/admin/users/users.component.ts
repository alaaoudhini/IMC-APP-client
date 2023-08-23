import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
  
})

export class AdminUsersComponent implements OnInit {
  users: any;
  
  userForm: FormGroup; 

 
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      date_of_birth: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      role: ['', Validators.required]
    });
  }

  

  ngOnInit() {
    this.getUserData();
    this.addUserData();
    //this.updateUserData();
    //this.deleteUserData();
  }

  getUserData() {
    console.log('Manage Users');

    // Assuming you have a function to get the authentication token, e.g., getAuthToken()
    const authToken = this.getAuthToken();

    // Set the headers with the authentication token
    const headers = {
      'Authorization': `Bearer ${authToken}`
    };

    this.userService.getUsers(headers).subscribe(
      (res: any) => {
        console.log(res);
        this.users = res.users; // Assuming the users array is nested under 'users' property
        this.showSnackBar('User data refreshed successfully', 'success-snackbar');

      },
      (error) => {
        console.error('Error fetching users:', error);
        this.showSnackBar('Error fetching users', 'error-snackbar');
      }
    );
  }

  addUserData() {

    if (this.userForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      return;
    }
  
    const data = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      date_of_birth: this.userForm.value.dateOfBirth,
      role: this.userForm.value.role
    };
    
    console.log('User Form Data:', this.userForm.value);

    // Assuming you have a function to get the authentication token, e.g., getAuthToken()
    const authToken = this.getAuthToken();
  
    // Set the headers with the authentication token
    const headers = {
      'Authorization': `Bearer ${authToken}`
    };
  
    //const userFormData = this.userForm.value;
   this.userService.addUsers(headers, this.userForm.value).subscribe(
      (res: any) => {
        console.log(res);
        this.userForm.reset();
        this.getUserData();
        this.showSnackBar('User data added successfully', 'success-snackbar');
      },
      (error) => {
        console.error('Error adding user:', error); 
        this.showSnackBar('Error adding user', 'error-snackbar');
      }
    );
    
  }  


  updateUserData(userId: number) {

    if (this.userForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      return;
    }
  
    const data = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      date_of_birth: this.userForm.value.dateOfBirth,
      role: this.userForm.value.role
    };
    
    console.log('User Form Data:', this.userForm.value);

  // Assuming you have a function to get the authentication token, e.g., getAuthToken()
  const authToken = this.getAuthToken();

  // Set the headers with the authentication token
  const headers = {
    'Authorization': `Bearer ${authToken}`
  };

  this.userService.updateUsers(userId, headers, this.userForm.value).subscribe(
    (res: any) => {
      console.log(res);
      this.userForm.reset();
      this.getUserData();
      this.showSnackBar('User data updated successfully', 'success-snackbar');
    },
    (error) => {
      console.error('Error updating user:', error); 
      this.showSnackBar('Error while updating user', 'error-snackbar');
    }
  );
}
  deleteUserData(userId: number) {
    console.log('User Deleted');
  
    // Assuming you have a function to get the authentication token, e.g., getAuthToken()
    const authToken = this.getAuthToken();
  
    // Set the headers with the authentication token
    const headers = {
      'Authorization': `Bearer ${authToken}`
    };
  
    this.userService.deleteUsers(userId, headers).subscribe(
      (res: any) => {
        console.log(res);
        this.getUserData(); // Refresh user data after deletion
        this.showSnackBar('User data deleted successfully', 'success-snackbar');
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.showSnackBar('Error while deleting user', 'error-snackbar');
      }
    );
  }
  
  // This is a hypothetical function, replace it with your actual token retrieval logic
  getAuthToken(): string 
  {
    // Replace this with your actual token retrieval logic
    return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzE5YTkzYWFjZGEwMmNjZWRlOGIyY2UxZjYxOGYzNGI4OTU2ZDIyODNjM2YxYjUyYjlhMDdhMGZlOGM4YWFjMTZkY2RhNDMyMTBjZDBiZDIiLCJpYXQiOjE2OTI0ODg2OTQuNzA0MzkyLCJuYmYiOjE2OTI0ODg2OTQuNzA0Mzk1LCJleHAiOjE3MjQxMTEwOTQuNzAxODEyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.sLaLMo4w6u9EXSpA-DHNA_i5Vy9FfHwNZRWBycE0jwBR9vy0MhiEuA87nVL8TP4Ovi72qVNcz0lKwo9Z2DXMjj3rA_6yJzUEKrUuZtX5VueNIKaJdzW2dcDt8jykCbyklqdx_FUfGCnFDS3O6HBdxT9WLNtGH-F9U8Rj3HrTeLUrCJi9bwLlmv89rabmrY1Xbaikn9eI1WxoVSrh8YYRZECIzo9RPCDnTv-yf-LXv5NOwjePhNemKQtzNTNCxADNYnrrlWlagULeAcx-sxVyu0VNaZYOpadGG7f36mpdqgw9H0eduztGoEYUDT3CQD6laACUhieYzOYXQa7ipSrakaOxBXyGIrvGsJDoyNoQyKzptdYBMAAImVBYYxCyVx-B5_K0RK0Gx3yk6vD7wxAuyidmbDvnhTf3PkmqPlmNMeBIOi7oOfzq8IzitKznsMvGoijwll-qjo8fQ0idRsWr2kPu0KO0JDOoRbsZSuSP4TZnenKmASeD1tjB4Yo5RPF-iYY31AzfQ9B_e01JWmg3myhqoZoBZqA4gMbA6u0WPiIczTZbLTUG9KUc1MNUQPJPlYjfropGClkgxm80sAVSCSLbO8Md7PjHYu5Jr9Hc8hJ9rGlOAI1QliDaI2J0KrCuVgaNcos8SHBT548y6EDn43fxmc-FXs0tutb9L79iyi8'; // Your token here
  }

  showSnackBar(message: string, cssClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [cssClass]
    });
  }
}
