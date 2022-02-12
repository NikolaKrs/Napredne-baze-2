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
import * as MarketAction from '../store/market/market.actions';
import { SResponse } from '../Models/response';
import { Korisnik } from '../Models/Korisnik-model';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  constructor(private httpClient: HttpClient,private store: Store<AppState>) {}

  public getMarket() {
    return this.httpClient
      .get<SResponse>(`https://localhost:44318/Crypto/GetMarket`)
      .pipe(catchError(errorHandler));
  }
  public getValuta() {
    return this.httpClient
      .get<SResponse>(`https://localhost:44318/Crypto/GetValute`)
      .pipe(catchError(errorHandler));
  }
  public buyCoin(kolicina:number, valuta: string, id:string) {
    const headers = { 'content-type': 'application/json'}  

    const body=JSON.stringify({
      "korisnickoIme": id,
      "valutaRef": valuta,
      "kolicina": kolicina
    });
    return this.httpClient.post<SResponse>(`${environment.api}/Crypto/InsertOrUpdateUserValute`,body,{'headers':headers})
    .pipe(map(user => {
      // login successful if there's a jwt token in the response
      if ( user&& user.statuscode==200 &&user.obj) 
      {
           // store user details and jwt token in local storage to keep user logged in between page refreshe
          this.store.dispatch( KorisnikActions.loadUserSuccess({ korisnik: user.obj as Korisnik }));
      }
      return user.obj;
  }));
  }


  public sellCoin(kolicina:number, valuta: string, id:string) {
    const headers = { 'content-type': 'application/json'}  

    const body=JSON.stringify({
      "korisnickoIme": id,
      "valutaRef": valuta,
      "kolicina": kolicina
    });
    return this.httpClient.post<SResponse>(`${environment.api}/Crypto/InsertOrUpdateUserValute`,body,{'headers':headers})
    .pipe(map(user => {
      // login successful if there's a jwt token in the response
      if ( user&& user.statuscode==200 &&user.obj) 
      {
           // store user details and jwt token in local storage to keep user logged in between page refreshe
          this.store.dispatch( KorisnikActions.loadUserSuccess({ korisnik: user.obj as Korisnik }));
      }
      return user.obj;
  }));
  }

  public convertCoin(kolicina:number, valuta: string, id:string,valutaTransfer:string,kolicinaTransfer:number) {
    //UPDATE
    const headers = { 'content-type': 'application/json' };
    const body=JSON.stringify({
      "korisnickoIme": id,
      "valutaRef": valuta,
      "kolicina": kolicina,
      "valutaTransfer": valutaTransfer,
      "kolicinaTransfer": kolicinaTransfer
    });
    return this.httpClient.post<SResponse>(`${environment.api}/Crypto/TransferValuta`,body,
      { headers: headers }
    )
    .pipe(map(user => {
      // login successful if there's a jwt token in the response
      if ( user&& user.statuscode==200 &&user.obj) 
      {
           // store user details and jwt token in local storage to keep user logged in between page refreshe
          this.store.dispatch( KorisnikActions.loadUserSuccess({ korisnik: user.obj as Korisnik }));
      }
      return user.obj;
  }));
  }

  public insertCoin(valuta: Valuta) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(valuta);
    return this.httpClient.post<SResponse>(`${environment.api}/Crypto/InsertValute`, body, {
      headers: headers,
    }) .pipe(map(coin => {
      if ( coin&& coin.statuscode==200 &&coin.obj) 
      {     
          this.store.dispatch( MarketAction.addCoin({ coin: coin.obj as Valuta }));
      }
      return coin;
  }));
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
