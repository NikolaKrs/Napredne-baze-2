import { createAction, props } from '@ngrx/store';
import { Market } from 'src/app/Models/Market-model';
import { Valuta } from 'src/app/Models/Valuta-model';

export const loadMarketStart = createAction('Load market start');

export const loadMarketSuccess = createAction(
  'Load market success',
  props<{
    market: Market;
  }>()
);

export const loadCoinsStart = createAction('Load coins start');

export const loadCoinsSuccess = createAction(
  'Load coins success',
  props<{
    coins: Valuta[];
  }>()
);

export const addCoin = createAction(
  'Add coin success',
  props<{
    coin: Valuta;
  }>()
);
