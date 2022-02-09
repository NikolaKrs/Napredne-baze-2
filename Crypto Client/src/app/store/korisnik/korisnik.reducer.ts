import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { Korisnik } from "src/app/Models/Korisnik-model";
import * as Actions from "./korisnik.actions"

export interface KorisnikState{
    korisnik:Korisnik,
    ulogovan: boolean
}

export const initialState : KorisnikState = {korisnik:{id:"",username:"Nema2",ime:"Nema1",prezime:"Nema3",password:"Nema4",values:[]},ulogovan:false}

export const korisnikReducer = createReducer(
    initialState,
    on(Actions.loadUserSuccess, (state, {korisnik}) => ({...state,korisnik:korisnik,ulogovan:true})),
    on(Actions.logOut,(state) => ({...state, ulogovan:false,korisnik:initialState.korisnik}))
);