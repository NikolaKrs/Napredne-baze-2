import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';

import * as KorisnikActions from './korisnik.actions';

@Injectable()
export class KorisnikEffect {
  constructor(
    private korisnikService: KorisnikService,
    private actions$: Actions
  ) {}

  loadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KorisnikActions.loadUserStart),
      mergeMap((action) =>
        this.korisnikService
          .getUser(action.korisnickoIme,action.sifra)
          .pipe(
            map((korisnik) =>
              KorisnikActions.loadUserSuccess({ korisnik: korisnik })
            ),
            catchError(() => of({ type: 'load error' }))
          )
      )
    )
  );
}
