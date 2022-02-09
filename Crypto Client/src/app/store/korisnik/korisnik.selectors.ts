import { createSelector } from "@ngrx/store";
import { AppState } from "../app-state";

export const selectUserFeature = (state: AppState) => state.korisnik;

export const selectUser = createSelector(
    selectUserFeature,
    (state)=> state.korisnik
    );

export const selectLogin = createSelector(
    selectUserFeature,
    (state)=> state.ulogovan
    );
export const selectUserId = createSelector(
    selectUserFeature,
    (state)=> state.korisnik.korisnickoIme
    );
export const selectUserCoins = createSelector(
    selectUserFeature,
    (state)=> state.korisnik.korisnickeValute
    );
