import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Market } from '../Models/Market-model';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Valuta } from '../Models/Valuta-model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app-state';
import * as KorisnikActions from '../store/korisnik/korisnik.actions';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  constructor(private httpClient: HttpClient,private store: Store<AppState>) {}

  public getMarket() {
    return this.httpClient
      .get<Market>(`https://localhost:44318/Crypto/GetMarket`)
      .pipe(catchError(errorHandler));
  }
  public getValuta() {
    return this.httpClient
      .get<Array<Valuta>>(`https://localhost:44318/Crypto/GetValute`)
      .pipe(catchError(errorHandler));
  }
  public buyCoin(kolicina:number, valuta: string, id:string) {
    const headers = { 'content-type': 'application/json'}  

    const body=JSON.stringify({
      "korisnik": id,
      "valuta": valuta,
      "kolicina": kolicina
    });
    return this.httpClient.post<any>(`${environment.api}/Crypto/InsertOrUpdateUserValute`,body,{'headers':headers})
    .pipe(map(user => {
      // login successful if there's a jwt token in the response
      if (user) 
      {
           // store user details and jwt token in local storage to keep user logged in between page refreshe
          this.store.dispatch( KorisnikActions.loadUserSuccess({ korisnik: user }));
      }
      return user;
  }));
  }

  public putValute(valuta: Valuta) {
    //UPDATE
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(valuta);
    return this.httpClient.put<Valuta>(
      environment.api + 'valute/' + valuta.id,
      body,
      { headers: headers }
    );
  }

  public insertValute(valuta: Valuta) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(valuta);
    return this.httpClient.post<Valuta>(environment.api + 'valute/', body, {
      headers: headers,
    });
  }

  public deleteValuta(id: number) {
    return this.httpClient.delete(environment.api + 'valute/' + id);
  }
}

const errorHandler = (error: HttpErrorResponse) => {
  const errorMessage =
    error.status === 0
      ? 'Cant connect to API ' + error.error
      : 'Backend returned code ' + error.status;
  return throwError(errorMessage);
};
