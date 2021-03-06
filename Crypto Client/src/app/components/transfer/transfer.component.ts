import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common'
import { Valuta } from 'src/app/Models/Valuta-model';
import { selectCurrentCoin } from 'src/app/store/coin/coin.selectors';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { firstValueFrom, Subscription, take } from 'rxjs';
import * as market from 'src/app/services/market.service';
import { CoinState } from 'src/app/store/coin/coin.reducer';
import { SResponse } from 'src/app/Models/response';
import { selectUserId } from 'src/app/store/korisnik/korisnik.selectors';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  constructor(private router:Router,private _location: Location,private store: Store<AppState>,private service: market.MarketService) { }
  value = 0;
  selected:Valuta={id:"",ime:"",cena:0,rast:0,punoime:"",slika:""};
  
  valuta: CoinState;
  subscription: Subscription;
  public valute:Valuta[];
  handleMinus() {
    if(this.value>=1)
    {
      this.value--;  
    }
  }
  handlePlus() {
    if(this.value<=this.valuta.kolicina-1)
    {
      this.value++;    
    }
  }
  back()
  {
    this._location.back();
  }
  async convert()
  {
    const data= await firstValueFrom(this.store.pipe(select(selectUserId),take(1)));
    this.service.convertCoin(this.valuta.kolicina-this.value, this.valuta.coin.id,data,this.selected.ime,this.value*this.valuta.coin.cena/this.selected.cena).subscribe((val:any)=>
    console.log(val));
    this.router.navigate(["wallet"])
  }
  updatevalue()
  {
    if(this.value>this.valuta.kolicina-1)
    {
      
      this.value=this.valuta.kolicina;
    }
  }
  select(event:Event)
  {
    this.selected=this.valute[Number((event.target as HTMLSelectElement).value)];
    console.log(this.selected);
  }
  ngOnInit() 
  {
    this.subscription=this.store.select(selectCurrentCoin).subscribe((val:CoinState)=>{

      this.valuta=val;
      console.log(val)
      });

      this.service.getValuta().subscribe((val:SResponse)=>{
        this.valute=val.obj;
        console.log(val)
      });
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
