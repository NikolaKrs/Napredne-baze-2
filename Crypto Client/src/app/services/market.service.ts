import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Market } from '../Models/Market-model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Valuta } from '../Models/Valuta-model';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  constructor(private httpClient: HttpClient) {}

  public getMarket() {
    return this.httpClient
      .get<Market>(`${environment.api}.....`)
      .pipe(catchError(errorHandler));
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
      ? 'Cant connect to API' + error.error
      : 'Bakend returned code' + error.status;
  return throwError(errorMessage);
};
