import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MarketService } from 'src/app/services/market.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';

import * as MarketActions from './market.actions';

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
            map((market) =>
              MarketActions.loadMarketSuccess({ market: market })
            ),
            catchError(() => of({ type: 'load error' }))
          )
      )
    )
  );
}
