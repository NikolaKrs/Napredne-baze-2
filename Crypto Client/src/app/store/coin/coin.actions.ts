import { Action, createAction, props } from '@ngrx/store';
import { Valuta } from 'src/app/Models/Valuta-model';
 
export const SetCurrentCoin = createAction(
  'set current coin',
  props<{
    coin: Valuta;
  }>()
);