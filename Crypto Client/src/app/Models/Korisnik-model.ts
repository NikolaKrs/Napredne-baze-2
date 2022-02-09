import { KorisnikValuta } from "./korisnikValuta-model";
import { Valuta } from "./Valuta-model";

export interface Korisnik{
    korisnickoIme:string,
    ime:string,
    prezime:string,
    sifra:string,
    korisnickeValute:KorisnikValuta[]
}