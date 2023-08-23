import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-regimes',
  templateUrl: './regimes.component.html',
  styleUrls: ['./regimes.component.css']
})
export class RegimesComponent {

  regimes: any;
  
  regimeForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ){
    this.regimeForm = this.formBuilder.group({
      nom_reg: ['', Validators.required],
      description_reg: ['', [Validators.required]],
      type_reg: ['', [Validators.required]],
      calories_reg: ['', Validators.required],
      max_imc_reg: ['', [Validators.required]],
      min_imc_reg: ['', [Validators.required]]
      
    });
    
  }

  ngOnInit() {
    this.getRegimesData();
    this.addRegimesData();
  }


  getRegimesData() {
    console.log('Manage Regimes');

    // Assuming you have a function to get the authentication token, e.g., getAuthToken()
    const authToken = this.getAuthToken();

    // Set the headers with the authentication token
    const headers = {
      'Authorization': `Bearer ${authToken}`
    };

    this.userService.getRegimes(headers).subscribe(
      (res: any) => {
        console.log(res);
        this.regimes = res.regimes; // Assuming the users array is nested under 'users' property
        this.showSnackBar('regime data refreshed successfully', 'success-snackbar');

      },
      (error) => {
        console.error('Error fetching regimes:', error);
        this.showSnackBar('Error fetching regimes', 'error-snackbar');
      }
    );
}

addRegimesData()
{
  if (this.regimeForm.invalid) {
    this.snackBar.open('Please fill in all required fields correctly', 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
    return;
  }

  const data = {
    nom_reg: this.regimeForm.get('nom_reg')?.value,
    description_reg: this.regimeForm.get('description_reg')?.value,
    type_reg: this.regimeForm.get('type_reg')?.value,
    calories_reg: this.regimeForm.get('calories_reg')?.value,
    max_imc_reg: this.regimeForm.get('max_imc_reg')?.value,
    min_imc_reg: this.regimeForm.get('min_imc_reg')?.value
    
  };
  
  
  console.log('Regime Form Data:', this.regimeForm.value);

  // Assuming you have a function to get the authentication token, e.g., getAuthToken()
  const authToken = this.getAuthToken();

  // Set the headers with the authentication token
  const headers = {
    'Authorization': `Bearer ${authToken}`
  };

  this.userService.addRegimes(headers, data).subscribe(
    (res: any) => {
      console.log(res);
      this.regimeForm.reset();
      this.getRegimesData();
      this.showSnackBar('Regime data added successfully', 'success-snackbar');
    },
    (error) => {
      console.error('Error adding regime:', error); 
      this.showSnackBar('Error adding regime', 'error-snackbar');
    }
  );

}

updateRegimesData(userId: number)
  {
    if (this.regimeForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      return;
    }
  
    const data = {
      nom_reg: this.regimeForm.get('nom_reg')?.value,
      description_reg: this.regimeForm.get('description_reg')?.value,
      type_reg: this.regimeForm.get('type_reg')?.value,
      calories_reg: this.regimeForm.get('calories_reg')?.value,
      max_imc_reg: this.regimeForm.get('max_imc_reg')?.value,
      min_imc_reg: this.regimeForm.get('min_imc_reg')?.value
      
    };
    
    //console.log('Activity Form Data:', this.activityForm.value);

    // Assuming you have a function to get the authentication token, e.g., getAuthToken()
    const authToken = this.getAuthToken();
  
    // Set the headers with the authentication token
    const headers = {
      'Authorization': `Bearer ${authToken}`
    };
  
    //const userFormData = this.userForm.value;
    this.userService.updateRegimes(userId, headers, data).subscribe(
      (res: any) => {
        console.log(res);
        this.regimeForm.reset();
        this.getRegimesData();
        this.showSnackBar('Regime data added successfully', 'success-snackbar');
      },
      (error) => {
        console.error('Error adding regime:', error); 
        this.showSnackBar('Error adding regime', 'error-snackbar');
      }
    );

  }

  deleteRegimesData(userId: number)
  {
    console.log('Activity Deleted');
  
    // Assuming you have a function to get the authentication token, e.g., getAuthToken()
    const authToken = this.getAuthToken();
  
    // Set the headers with the authentication token
    const headers = {
      'Authorization': `Bearer ${authToken}`
    };
  
    this.userService.deleteRegimes(userId, headers).subscribe(
      (res: any) => {
        console.log(res);
        this.getRegimesData(); // Refresh user data after deletion
        this.showSnackBar('Regime data deleted successfully', 'success-snackbar');
      },
      (error) => {
        console.error('Error deleting regime:', error);
        this.showSnackBar('Error while deleting regime', 'error-snackbar');
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
