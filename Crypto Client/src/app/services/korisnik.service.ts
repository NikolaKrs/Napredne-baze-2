import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Korisnik } from '../Models/Korisnik-model';
import { AppState } from '../store/app-state';
import * as KorisnikActions from '../store/korisnik/korisnik.actions';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {


  constructor(private httpClient: HttpClient,private store: Store<AppState>) { }

  public getUser(username:string,password:string){
    return  this.httpClient.get<Korisnik>(`${environment.api}.....`).pipe(
      catchError(errorHandler)
    )
  }

  public checkUsername(korisnickoIme:string){
    return  this.httpClient.get<Korisnik>(`${environment.api}korisnici/?korisnickoIme=${korisnickoIme}`).pipe(
      catchError(errorHandler)
    )
  }

  public insertUser(korisnik:Korisnik){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(korisnik);
    return this.httpClient.post<Korisnik>(`${environment.api}/Crypto/PostUser`,body,{'headers':headers}).pipe(
      catchError(errorHandler)
    );
  }

  public uploadImage(image: ArrayBuffer)
  {
    return this.httpClient.post<{novoime:string}>(environment.api,image);//treba drugi api
  }
  login(username: string, password: string) {
    const headers = { 'content-type': 'application/json'}  

    const body=JSON.stringify({"username":username,"password":password});
    return this.httpClient.post<any>(`${environment.api}/Crypto/GetUser`,body,{'headers':headers})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user) 
            {
                // store user details and jwt token in local storage to keep user logged in between page refreshe
                this.store.dispatch( KorisnikActions.loadUserSuccess({ korisnik: user }));
            }
            KorisnikActions.loadUserSuccess({ korisnik: user })
            return user;
        }));
}
}



const errorHandler = (error: HttpErrorResponse) =>{
  const errorMessage = (error.status ===0)?
  'Cant connect to API'+ error.error:
  'Bakend returned code' + error.status;
  return throwError(errorMessage);
}
