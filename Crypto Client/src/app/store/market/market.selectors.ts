import { createSelector, props } from '@ngrx/store';
import { Valuta } from 'src/app/Models/Valuta-model';
import { Market } from '../../Models/Market-model';
import { AppState } from '../app-state';

export const selectMarketFeature = (state: AppState) => state.market;

export const selectMarket = createSelector(
  selectMarketFeature,
  (state) => Object.values(state.market)
);

export const selectCoins = createSelector(
  selectMarketFeature,
  (state) => Object.values(state.market.coins)
);
``