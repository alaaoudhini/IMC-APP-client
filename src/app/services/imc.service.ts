import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Imc {
  id: number;
  userId: number;
  height: number;
  weight: number;
}

/*export interface Regimebyimc {
  id: number;
  user_id: number;
  nom_reg: string;
  description_reg: string;
  type_reg: string;
  calories_reg: number;
  max_imc_reg: number;
  min_imc_reg: number;
}*/

@Injectable({
  providedIn: 'root'
})
export class ImcService {


  constructor(private http: HttpClient) { }

  addIMC(headers: any, imcForm: any): Observable<Imc[]> {
    const apiUrl = 'http://localhost:8000/api/calculate-imc';
    const httpHeaders = new HttpHeaders(headers);
  
    const ImcData = {
      height: imcForm.height,
      weight: imcForm.weight,
      
    };
  
    return this.http.post<Imc[]>(apiUrl, ImcData , { headers: httpHeaders });
  }

  
  /*getRegimeByImc(userId: number, imcId: number, headers: any): Observable<any> {
    const apiUrl = `http://localhost:8000/api/user/${userId}/imc/${imcId}/regime`;
    const httpHeaders = new HttpHeaders(headers);

    return this.http.get<any>(apiUrl, { headers: httpHeaders });
  }*/
  
}
