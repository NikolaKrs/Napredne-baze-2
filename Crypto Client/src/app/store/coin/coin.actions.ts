import { Action, createAction, props } from '@ngrx/store';
import { Valuta } from 'src/app/Models/Valuta-model';
import { CoinState } from './coin.reducer';
 
export const SetCurrentCoin = createAction(
  'set current coin',
  props<{
    coin: CoinState;
  }>()
);