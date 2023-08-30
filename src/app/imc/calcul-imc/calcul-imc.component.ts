import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ImcService } from '../../services/imc.service';

@Component({
  selector: 'app-calcul-imc',
  templateUrl: './calcul-imc.component.html',
  styleUrls: ['./calcul-imc.component.css']
})
export class CalculImcComponent {

  imcs: any;
  calculatedIMC: number = 0; // Initialize to 0
  imcForm: FormGroup;

  constructor(
    private imcService: ImcService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.imcForm = this.formBuilder.group({
      height: ['', Validators.required],
      weight: ['', [Validators.required]],
    });
  }

  // Remove ngOnInit since it's not needed here

  calculateIMC() {
    if (this.imcForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      return;
    }
    
    const height = this.imcForm.value.height; // Get the height value
    const weight = this.imcForm.value.weight; // Get the weight value
  
    if (height <= 0) {
      this.snackBar.open('Height must be greater than 0', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
      return;
    }
  
    console.log('User IMC Data:', this.imcForm.value);
  
    // Assuming you have a function to get the authentication token, e.g., getAuthToken()
    const authToken =  localStorage.getItem('token');
    
    // Set the headers with the authentication token
    const headers = {
      'Authorization': `Bearer ${authToken}`
    };
    
    this.imcService.addIMC(headers, this.imcForm.value).subscribe(
      (res: any) => {
        console.log(res);
        this.imcForm.reset();
        this.calculatedIMC = res.imc; // Update calculatedIMC with the response
        this.showSnackBar('User IMC calculated successfully', 'success-snackbar');
      },
      (error) => {
        console.error('Error calculating IMC:', error); 
        this.showSnackBar('Error calculating IMC', 'error-snackbar');
      }
    ); 
  }
  

  showSnackBar(message: string, cssClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [cssClass]
    });
  }
}
