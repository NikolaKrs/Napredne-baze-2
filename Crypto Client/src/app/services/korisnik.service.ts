import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Korisnik } from '../Models/Korisnik-model';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {


  constructor(private httpClient: HttpClient) { }

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

  public insertUser(user:Korisnik){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(user);
    return this.httpClient.post<Korisnik>(environment.api+"korisnici/",body,{'headers':headers});
  }

  public uploadImage(image: ArrayBuffer)
  {
    return this.httpClient.post<{novoime:string}>(environment.api,image);//treba drugi api
  }
}



const errorHandler = (error: HttpErrorResponse) =>{
  const errorMessage = (error.status ===0)?
  'Cant connect to API'+ error.error:
  'Bakend returned code' + error.status;
  return throwError(errorMessage);
}
