import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

  constructor(
    private authStorageService: LocalStorageService,
  ) { }

  getToken() {
    if(this.authStorageService.get('token')){
      console.log(this.authStorageService.get('token'))
      return this.authStorageService.get('token');
    }else{
      return false;
    }
  }
}

