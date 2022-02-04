import { Korisnik } from "../Models/Korisnik-model";
import { Market } from "../Models/Market-model";
import { KorisnikState } from "./korisnik/korisnik.reducer";
import { MarketState } from "./market/market.reducer";

export interface AppState{
    market:MarketState
    korisnik:KorisnikState
}