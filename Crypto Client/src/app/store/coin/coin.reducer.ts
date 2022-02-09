import { Action, createReducer, on } from '@ngrx/store';
import { Valuta } from 'src/app/Models/Valuta-model';
import * as Actions from './coin.actions';
 
export const initialState = {id:"id",ime:"Shib",cena:0.0003453333,rast:44,punoime:"Shiba inu",slika:"https://www.pngall.com/wp-content/uploads/10/Dogecoin-Crypto-Logo-PNG-Cutout.png"};
 
export const coinReducer = createReducer(
  initialState,
  on(Actions.SetCurrentCoin, (state, {coin}) => (coin)
  ),
  
);