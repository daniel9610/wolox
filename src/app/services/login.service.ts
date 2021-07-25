import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api_data: any;
  // public api_tk = environment.api_tk;
  public httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', 'accept':'application/json'})};
  public api_url = environment.Wolox_url;

  constructor(
    private http: HttpClient
  ) { }

  login(api_consult:string, email: string, password:string ){
    this.api_data = {
      "mail": email,
      "password":password,
    };
    const data = JSON.stringify(this.api_data);
    return this.http.post(this.api_url + api_consult, data, this.httpOptions);
  }
}
