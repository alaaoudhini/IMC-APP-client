import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  date_of_birth: Date;
  role: string;
}

export interface Activity {
  id: number;
  nom_act: string;
  description_act: string;
  type_act: string;
  max_imc: number;
  min_imc: number;
  video: string;
}

export interface Regime {
  id: number;
  nom_reg: string;
  description_reg: string;
  type_reg: string;
  calories_reg: number;
  max_imc_reg: number;
  min_imc_reg: number;
}


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject= new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();

   }

  login(headers: any, loginForm: any): Observable<User> {
    const apiUrl = 'http://localhost:8000/api/login';
    const httpHeaders = new HttpHeaders(headers);
  
    const authData = {
      email: loginForm.email,
      password: loginForm.password,
    };
  
    return this.http.post<User>(apiUrl, authData , { headers: httpHeaders }).pipe(map(user=>{
      localStorage.setItem('currentUser',JSON.stringify(user))
      this.currentUserSubject.next(user)
      return user
    }));
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
  this.currentUserSubject.next(null);
}
  getUsers(headers: any): Observable<User[]> 
  {
  const apiUrl = 'http://localhost:8000/api/users';
  const httpHeaders = new HttpHeaders(headers);

  return this.http.get<User[]>(apiUrl, { headers: httpHeaders });
 }

 addUsers(headers: any, userForm: any): Observable<User[]> {
  const apiUrl = 'http://localhost:8000/api/users';
  const httpHeaders = new HttpHeaders(headers);

  const userData = {
    name: userForm.name,
    email: userForm.email,
    password: userForm.password,
    date_of_birth: userForm.date_of_birth,
    role: userForm.role
  };

  return this.http.post<User[]>(apiUrl, userData , { headers: httpHeaders });
}


updateUsers(id: number, headers: any, userForm: any): Observable<User[]> {
  const apiUrl = `http://localhost:8000/api/users/${id}`;
  const httpHeaders = new HttpHeaders(headers);

  const userData = {
    name: userForm.name,
    email: userForm.email,
    password: userForm.password,
    date_of_birth: userForm.date_of_birth,
    role: userForm.role
  };

  return this.http.put<User[]>(apiUrl, userData, { headers: httpHeaders });
}

deleteUsers(id: number, headers: any): Observable<any> {
  const apiUrl = `http://localhost:8000/api/users/${id}`;
  const httpHeaders = new HttpHeaders(headers);

  return this.http.delete<any>(apiUrl, { headers: httpHeaders });
}

getActivities(headers: any): Observable<Activity[]> 
  {
  const apiUrl = 'http://localhost:8000/api/activities';
  const httpHeaders = new HttpHeaders(headers);

  return this.http.get<Activity[]>(apiUrl, { headers: httpHeaders });
 }

 addActivities(headers: any, activityForm: any): Observable<Activity[]> {
  const apiUrl = 'http://localhost:8000/api/activities';
  const httpHeaders = new HttpHeaders(headers);

  const activityData = {
    nom_act: activityForm.nom_act,
    description_act: activityForm.description_act,
    type_act: activityForm.type_act,
    max_imc: activityForm.max_imc,
    min_imc: activityForm.min_imc,
    video: activityForm.video
  };

  return this.http.post<Activity[]>(apiUrl, activityData , { headers: httpHeaders });
}

updateActivities(id: number, headers: any, activityForm: any): Observable<Activity[]> {
  const apiUrl = `http://localhost:8000/api/activities/${id}`;
  const httpHeaders = new HttpHeaders(headers);

  const activityData = {
    nom_act: activityForm.nom_act,
    description_act: activityForm.description_act,
    type_act: activityForm.type_act,
    max_imc: activityForm.max_imc,
    min_imc: activityForm.min_imc,
    video: activityForm.video
  };

  return this.http.put<Activity[]>(apiUrl, activityData , { headers: httpHeaders });
}

deleteActivities(id: number, headers: any): Observable<any> {
  const apiUrl = `http://localhost:8000/api/activities/${id}`;
  const httpHeaders = new HttpHeaders(headers);

  return this.http.delete<any>(apiUrl, { headers: httpHeaders });
}

getRegimes(headers: any): Observable<Regime[]> 
  {
  const apiUrl = 'http://localhost:8000/api/regimes';
  const httpHeaders = new HttpHeaders(headers);

  return this.http.get<Regime[]>(apiUrl, { headers: httpHeaders });
 }

 addRegimes(headers: any, regimeForm: any): Observable<Regime[]> {
  const apiUrl = 'http://localhost:8000/api/regimes';
  const httpHeaders = new HttpHeaders(headers);

  const regimeData = {
    nom_reg: regimeForm.nom_reg,
    description_reg: regimeForm.description_reg,
    type_reg: regimeForm.type_reg,
    calories_reg: regimeForm.calories_reg,
    max_imc_reg: regimeForm.max_imc_reg,
    min_imc_reg: regimeForm.min_imc_reg
    
  };

  return this.http.post<Regime[]>(apiUrl, regimeData , { headers: httpHeaders });
}

updateRegimes(id: number, headers: any, regimeForm: any): Observable<Regime[]> {
  const apiUrl = `http://localhost:8000/api/regimes/${id}`;
  const httpHeaders = new HttpHeaders(headers);

  const regimeData = {
    nom_reg: regimeForm.nom_reg,
    description_reg: regimeForm.description_reg,
    type_reg: regimeForm.type_reg,
    calories_reg: regimeForm.calories_reg,
    max_imc_reg: regimeForm.max_imc_reg,
    min_imc_reg: regimeForm.min_imc_reg
    
  };

  return this.http.put<Regime[]>(apiUrl, regimeData , { headers: httpHeaders });
}

deleteRegimes(id: number, headers: any): Observable<any> {
  const apiUrl = `http://localhost:8000/api/regimes/${id}`;
  const httpHeaders = new HttpHeaders(headers);

  return this.http.delete<any>(apiUrl, { headers: httpHeaders });
}

}




