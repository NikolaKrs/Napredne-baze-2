import { createSelector, props } from '@ngrx/store';
import { Market } from '../../Models/Market-model';
import { AppState } from '../app-state';

export const selectMarketFeature = (state: AppState) => state.market;

export const selectMarket = createSelector(
  selectMarketFeature,
  (state) => Object.values(state.entities)[0]
);

export const selectValutes = createSelector(
  selectMarketFeature,
  (state) => Object.values(state.entities)[0]?.valute
);
