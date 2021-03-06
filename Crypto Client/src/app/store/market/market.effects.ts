import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MarketService } from 'src/app/services/market.service';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, take } from 'rxjs/operators';

import * as MarketActions from './market.actions';
import { Valuta } from 'src/app/Models/Valuta-model';

@Injectable()
export class MarketEffect {
  constructor(
    private marketService: MarketService,
    private actions$: Actions
  ) {}

  loadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MarketActions.loadMarketStart),
      mergeMap((action) =>
        this.marketService
          .getMarket()

          .pipe(
            filter(market=>market.obj != null),
            map((market) =>
            
              MarketActions.loadMarketSuccess({ market: market.obj })
            ),
            catchError(() => of({ type: 'load error' }))
          )
      )
    )
  );


  loadCoinEffect$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MarketActions.loadCoinsStart),
    mergeMap((action) =>
      this.marketService
        .getValuta()

        .pipe(  filter(market=>market.obj != null),
          map((coins) =>
            MarketActions.loadCoinsSuccess({ coins: coins.obj as Valuta[] })
          ),
          catchError(() => of({ type: 'load error' }))
        )
    )
  )
);
}
