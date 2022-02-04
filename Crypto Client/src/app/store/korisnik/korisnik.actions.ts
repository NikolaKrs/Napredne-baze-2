import { createAction, props } from '@ngrx/store';
import { Korisnik } from 'src/app/Models/Korisnik-model';

export const loadUserStart = createAction(
  'Load User',
  props<{
    korisnickoIme: string;
    sifra: string;
  }>()
);

export const loadUserSuccess = createAction(
  'Load User Success',
  props<{
    korisnik: Korisnik;
  }>()
);

export const logOut = createAction('Log out');
