import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-activityby-imc',
  templateUrl: './activityby-imc.component.html',
  styleUrls: ['./activityby-imc.component.css']
})
export class ActivitybyImcComponent implements OnInit {

  user : any ;
  imc: any;
  userId: number | undefined;
  imcId: number | undefined;
  activity: any ;
  videoUrl: any;
  sanitizedVideoUrl?: SafeResourceUrl;
  act?:any

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  openVideoModal(id: string) {
    const authToken = localStorage.getItem('token');
  
    if (authToken) {
      // Create headers with authorization token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
  
      // Use the headers to make the GET request
      this.http.get<any>('http://localhost:8000/api/activities/'+id, { headers })
        .subscribe(
          response => {
            this.act = response.activity;
            this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.act.video)
           console.log(this.act.video)
          },
          error => {
            console.log('Error fetching user data:', error);
          }
        );
    }
  }

  closeVideoModal() {
    this.videoUrl = null;
  }

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
  
            // Call the getActivityimcsData function with retrieved data
            if (this.userId !== undefined && this.imcId !== undefined) {
              this.getActivityimcsData(this.userId, this.imcId);
            }
          },
          error => {
            console.error('Error fetching user data:', error);
          }
        );
    }
  } 
  
  getActivityimcsData(userId: number, imcId: number)
  {
    console.log('Fetching Activity by IMC');

    // Get the token from local storage
    const authToken = localStorage.getItem('token');

    // Create headers with authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    // Call the service to fetch regime data
    const apiUrl = `http://localhost:8000/api/user/${userId}/imc/${imcId}/activities`;

    this.http.get<any>(apiUrl, { headers: headers }).subscribe(
      (response: any) => {
        this.activity = response.activity;
        console.log(this.activity)
        
        this.imc = response.imc; 
        this.showSnackBar('Activity data fetched successfully', 'success-snackbar');
      },
      (error) => {
        console.error('Error fetching activity by IMC:', error);
        this.showSnackBar('Error fetching activity data', 'error-snackbar');
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
