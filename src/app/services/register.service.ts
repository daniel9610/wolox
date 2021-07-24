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
  public httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', 'accept':'application/json', 'authorization':this.api_tk})};
  // public api_url = environment.Vehicles_api_url;


  constructor() { }
}
