import { Valuta } from "./Valuta-model";

export interface Korisnik{
    id:string,
    username:string,
    ime:string,
    prezime:string,
    password:string,
    values:Valuta[]
}