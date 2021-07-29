import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Pokemon } from '../shared/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  api_data: any;
  // public api_tk = environment.api_tk;
  public httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', 'accept':'application/json'})};
  public api_url = environment.Pokemon_url;

  constructor(
    private http: HttpClient,
  ) { }

  getPokemon(api_consult:string, limit:string, offset:string): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.api_url + 'pokemon' + '?limit=' + limit + '&offset=' + offset)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getDetails(api_consult:string): Observable<Pokemon> {
    return this.http.get<Pokemon>(api_consult)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  searchPokemon(api_consult:string, name_or_id:string): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.api_url+api_consult+'/'+name_or_id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  private handleError(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}


