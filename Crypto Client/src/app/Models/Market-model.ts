import { Valuta } from "./Valuta-model";

export interface Market{
    id: string
    ime:string
    coins:Valuta[]
}