import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  {
  selectedFile: File | null = null;
  user: any;
  isOpen = true;
  previewUrl: SafeUrl | null = null; 
   private subscription: Subscription | undefined;

  constructor(
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer // Add this line

  ) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  ngOnInit() {
    // Get the token from local storage
    const authToken = localStorage.getItem('token');
    
    if (authToken) {
      // Create headers with authorization token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
  
      // Use the headers to make the GET request to get user ID
      this.http.get<any>('http://localhost:8000/api/get-user-id', { headers })
        .subscribe(
          response => {
            this.user = response.user_id;// Store the entire user response or the relevant user details
  
            // Call the getUserAvatar function with retrieved user ID
            if (this.user && this.user.user_id !== undefined) {
              this.getUserAvatar(this.user.user_id);
            }
            
            // Load stored preview or get user avatar if not available
            const storedPreview = localStorage.getItem('avatarPreview');
            if (storedPreview) {
              this.previewUrl = storedPreview;
            } else if (this.user && this.user.user_id !== undefined) {
              this.getUserAvatar(this.user.user_id);
            }
          },
          error => {
            console.error('Error fetching user data:', error);
          }
        );
    }
  }
  
  


  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Use the result as the base64 encoded string of the image
        this.previewUrl = e.target.result;
        localStorage.setItem('avatarPreview', this.previewUrl as string);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  

  getUserAvatar(userId: number) {
    console.log('Fetching user avatar...');
    const authToken = localStorage.getItem('token');
    
    if (!authToken) {
      console.error('No authentication token found.');
      return;
    }
  
    const headers = {
      'Authorization': `Bearer ${authToken}`
    };
  
    this.subscription = this.http.get(`user/get-avatar/${userId}`, { headers, responseType: 'blob' })
      .subscribe(
        (response: any) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            // Use the result as the base64 encoded string of the image
            this.previewUrl = e.target.result;
            console.log('Fetched user avatar:', this.previewUrl);
            localStorage.setItem('avatarPreview', this.previewUrl as string);
          };
          reader.readAsDataURL(response);
        },
        (error: any) => {
          console.error('Error fetching avatar:', error);
        }
      );
  }
  
  

  uploadAvatar() {
    console.log('Selected File:', this.selectedFile);
    console.log('Upload button clicked.');
  
    const authToken = localStorage.getItem('token');
  
    if (!authToken) {
      console.error('No authentication token found.');
      return;
    }
  
    // Set the headers with the authentication token
    const headers = {
      'Authorization': `Bearer ${authToken}`
    };
  
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('avatar', this.selectedFile);
  
      this.http.post('http://localhost:8000/api/user/upload-avatar', formData, { headers })
        .subscribe(
          (response: any) => {
            // Handle success response (if needed)
            console.log('Avatar uploaded successfully:', response);
  
            // Refresh the user avatar
            if (this.user && this.user.user_id !== undefined) {
              this.getUserAvatar(this.user.user_id); // Pass the userId
            }
          },
          (error: any) => {
            // Handle error response
            console.error('Error uploading avatar:', error);
          }
        );
    } else {
      console.error('No avatar file selected.');
    }
  }
  
}