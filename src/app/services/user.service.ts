import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) { }

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




