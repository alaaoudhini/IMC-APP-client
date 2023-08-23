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
    const authToken = this.getAuthToken();

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
    const authToken = this.getAuthToken();
  
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
    const authToken = this.getAuthToken();
  
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
    const authToken = this.getAuthToken();
  
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
