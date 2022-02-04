import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Market } from 'src/app/Models/Market-model';
import * as Actions from './market.actions';

export interface MarketState extends EntityState<Market> {}

const adapter = createEntityAdapter<Market>();

export const initialState: MarketState = adapter.getInitialState();

export const marketReducer = createReducer(
  initialState,
  on(Actions.loadMarketSuccess, (state, { market }) =>
    adapter.setOne(market, state)
  ),
  
);
