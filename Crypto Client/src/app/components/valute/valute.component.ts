import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Valuta } from 'src/app/Models/Valuta-model';
import { AppState } from 'src/app/store/app-state';
import * as market from 'src/app/services/market.service';
import { selectCoins } from 'src/app/store/market/market.selectors';
import { selectUserCoins } from 'src/app/store/korisnik/korisnik.selectors';

@Component({
  selector: 'app-valute',
  templateUrl: './valute.component.html',
  styleUrls: ['./valute.component.css']
})
export class ValuteComponent implements OnInit {

  public grafik_podaci:Array<number> =[1,2,3,-4,5,0,0,1,1,1,1,1,1,1,1];
  public valute:Array<Valuta> =[];
  constructor(private store: Store<AppState>,private service: market.MarketService) { }
  @Input() wallet_or_home:string="home";
  @Input() show:boolean=false;
  ngOnInit() 
  {
   if(this.wallet_or_home=='home')
   {
    this.store.select(selectCoins).subscribe((val:Valuta[])=>{
      this.valute=val;
      console.log(val)
    });
   } 
  else if(this.wallet_or_home=='wallet')
   {
      this.store.select(selectUserCoins).subscribe((val:Valuta[])=>{
      this.valute=val;
      console.log(val)
    });
   } 
  }

}
