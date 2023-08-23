import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent {

  activities: any;
  
  activityForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ){
    this.activityForm = this.formBuilder.group({
      nom_act: ['', Validators.required],
      description_act: ['', [Validators.required]],
      type_act: ['', [Validators.required]],
      max_imc: ['', [Validators.required]],
      min_imc: ['', [Validators.required]],
      video: ['', Validators.required]
    });
    
  }


  ngOnInit() {
    this.getActivitiesData();
    this.addActivitiesData();
  }

  getActivitiesData() {
    console.log('Manage Activities');

    // Assuming you have a function to get the authentication token, e.g., getAuthToken()
    const authToken = localStorage.getItem('token');

    // Set the headers with the authentication token
    const headers = {
      'Authorization': `Bearer ${authToken}`
    };

    this.userService.getActivities(headers).subscribe(
      (res: any) => {
        console.log(res);
        this.activities = res.activities; // Assuming the users array is nested under 'users' property
        this.showSnackBar('activity data refreshed successfully', 'success-snackbar');

      },
      (error) => {
        console.error('Error fetching activities:', error);
        this.showSnackBar('Error fetching activities', 'error-snackbar');
      }
    );
  }

  addActivitiesData()
  {
    if (this.activityForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      return;
    }
  
    const data = {
      nom_act: this.activityForm.get('nom_act')?.value,
      description_act: this.activityForm.get('description_act')?.value,
      type_act: this.activityForm.get('type_act')?.value,
      max_imc: this.activityForm.get('max_imc')?.value,
      min_imc: this.activityForm.get('min_imc')?.value,
      video: this.activityForm.get('video')?.value
    };
    
    
    console.log('Activity Form Data:', this.activityForm.value);

    // Assuming you have a function to get the authentication token, e.g., getAuthToken()
    const authToken = localStorage.getItem('token');
  
    // Set the headers with the authentication token
    const headers = {
      'Authorization': `Bearer ${authToken}`
    };
  
    this.userService.addActivities(headers, data).subscribe(
      (res: any) => {
        console.log(res);
        this.activityForm.reset();
        this.getActivitiesData();
        this.showSnackBar('Activity data added successfully', 'success-snackbar');
      },
      (error) => {
        console.error('Error adding activity:', error); 
        this.showSnackBar('Error adding activity', 'error-snackbar');
      }
    );
  }

  updateActivitiesData(userId: number)
  {
    if (this.activityForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      return;
    }
  
    const data = {
      nom_act: this.activityForm.get('nom_act')?.value,
      description_act: this.activityForm.get('description_act')?.value,
      type_act: this.activityForm.get('type_act')?.value,
      max_imc: this.activityForm.get('max_imc')?.value,
      min_imc: this.activityForm.get('min_imc')?.value,
      video: this.activityForm.get('video')?.value
    };
    
    //console.log('Activity Form Data:', this.activityForm.value);

    // Assuming you have a function to get the authentication token, e.g., getAuthToken()
    const authToken = localStorage.getItem('token');
  
    // Set the headers with the authentication token
    const headers = {
      'Authorization': `Bearer ${authToken}`
    };
  
    //const userFormData = this.userForm.value;
    this.userService.updateActivities(userId, headers, data).subscribe(
      (res: any) => {
        console.log(res);
        this.activityForm.reset();
        this.getActivitiesData();
        this.showSnackBar('Activity data added successfully', 'success-snackbar');
      },
      (error) => {
        console.error('Error adding activity:', error); 
        this.showSnackBar('Error adding activity', 'error-snackbar');
      }
    );

  }

  deleteActivitiesData(userId: number)
  {
    console.log('Activity Deleted');
  
    // Assuming you have a function to get the authentication token, e.g., getAuthToken()
    const authToken = localStorage.getItem('token');
  
    // Set the headers with the authentication token
    const headers = {
      'Authorization': `Bearer ${authToken}`
    };
  
    this.userService.deleteActivities(userId, headers).subscribe(
      (res: any) => {
        console.log(res);
        this.getActivitiesData(); // Refresh user data after deletion
        this.showSnackBar('Activity data deleted successfully', 'success-snackbar');
      },
      (error) => {
        console.error('Error deleting activity:', error);
        this.showSnackBar('Error while deleting activity', 'error-snackbar');
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
