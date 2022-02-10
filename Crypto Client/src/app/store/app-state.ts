import { Korisnik } from "../Models/Korisnik-model";
import { Market } from "../Models/Market-model";
import { Valuta } from "../Models/Valuta-model";
import { CoinState } from "./coin/coin.reducer";
import { KorisnikState } from "./korisnik/korisnik.reducer";
import { MarketState } from "./market/market.reducer";

export interface AppState{
    market:MarketState
    korisnik:KorisnikState
    coin:CoinState
} 
   