import { createAction, props } from '@ngrx/store';
import { Market } from 'src/app/Models/Market-model';

export const loadMarketStart = createAction('Load market');

export const loadMarketSuccess = createAction(
  'Load market success',
  props<{
    market: Market;
  }>()
);
