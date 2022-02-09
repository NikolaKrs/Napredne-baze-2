import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Market } from 'src/app/Models/Market-model';
import * as Actions from './market.actions';

export interface MarketState{
  market:Market,
}


export const initialState: MarketState = {market:{id:"",ime:"",coins:[]}};

export const marketReducer = createReducer(
  initialState,
  on(Actions.loadMarketSuccess, (state, { market }) =>({...state,market:{...state.market,id:market.id,ime:market.ime}})
  ),
  on(Actions.loadCoinsSuccess, (state, { coins }) =>({...state,market: {...state.market,coins:coins}})
  ),
  
);
