import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-regimeby-imc',
  templateUrl: './regimeby-imc.component.html',
  styleUrls: ['./regimeby-imc.component.css']
})
export class RegimebyIMCComponent implements OnInit {

  user : any ;
  imc: any;
  userId: number | undefined;
  imcId: number | undefined;
  regime: any ;

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Get the token from local storage
    const authToken = localStorage.getItem('token');
  
    if (authToken) {
      // Create headers with authorization token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
  
      // Use the headers to make the GET request
      this.http.get<any>('http://localhost:8000/api/get-user-id', { headers })
        .subscribe(
          response => {
            this.userId = response.user_id;
            this.imcId = response.imc_id;
  
            // Call the getRegimeimcsData function with retrieved data
            if (this.userId !== undefined && this.imcId !== undefined) {
              this.getRegimeimcsData(this.userId, this.imcId);
            }
          },
          error => {
            console.error('Error fetching user data:', error);
          }
        );
    }
  }  
  
  getRegimeimcsData(userId: number, imcId: number){
    console.log('Fetching Regime by IMC');

    // Get the token from local storage
    const authToken = localStorage.getItem('token');

    // Create headers with authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    // Call the service to fetch regime data
    const apiUrl = `http://localhost:8000/api/user/${userId}/imc/${imcId}/regime`;

    this.http.get<any>(apiUrl, { headers: headers }).subscribe(
      (response: any) => {
        console.log(response);
        this.regime = response.regime;
        this.imc = response.imc; 
        this.showSnackBar('Regime data fetched successfully', 'success-snackbar');
      },
      (error) => {
        console.error('Error fetching regime by IMC:', error);
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
