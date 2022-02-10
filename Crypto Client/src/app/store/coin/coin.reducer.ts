import { Action, createReducer, on } from '@ngrx/store';
import { Valuta } from 'src/app/Models/Valuta-model';
import * as Actions from './coin.actions';
 
export interface CoinState{
  coin:Valuta,
  kolicina: number
}
export const initialState:CoinState = {coin:{id:"",ime:"",cena:0,rast:0,punoime:"",slika:""},kolicina:0};
 
export const coinReducer = createReducer(
  initialState,
  on(Actions.SetCurrentCoin, (state, {coin}) => (coin)
  ),
  
);