import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  api_data: any;
  // public api_tk = environment.api_tk;
  public httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', 'accept':'application/json'})};
  public api_url = environment.Wolox_url;


  constructor(
    private http: HttpClient
  ) { }

  register(api_consult:string, name: string, lastname: string, country: string, email: string, phone: string, password:string ){
    this.api_data = {
      "name":name,
      "lastname":lastname,
      "country":country,
      "mail": email,
      "phone":phone,
      "password":password,
    };
    const data = JSON.stringify(this.api_data);
    return this.http.post(this.api_url + api_consult, data, this.httpOptions);
  }
}
