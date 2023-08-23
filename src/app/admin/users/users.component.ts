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
    const authToken =  localStorage.getItem('token');

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
    const authToken =  localStorage.getItem('token');
  
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
  const authToken =  localStorage.getItem('token');

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
    const authToken = localStorage.getItem('token');
  
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
 

  showSnackBar(message: string, cssClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [cssClass]
    });
  }
}
