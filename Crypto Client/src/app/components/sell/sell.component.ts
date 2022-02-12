import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common'
import { Valuta } from 'src/app/Models/Valuta-model';
import { selectCurrentCoin } from 'src/app/store/coin/coin.selectors';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { firstValueFrom, Subscription, take } from 'rxjs';
import { loadCoinsStart, loadMarketStart, loadMarketSuccess } from 'src/app/store/market/market.actions';
import { CoinState } from 'src/app/store/coin/coin.reducer';
import * as market from 'src/app/services/market.service';
import { selectUserId } from 'src/app/store/korisnik/korisnik.selectors';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  constructor(private router:Router,private _location: Location,private store: Store<AppState>,private service: market.MarketService) { }
  value = 0;
  valuta: CoinState;
  subscription: Subscription 
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
  async sell()
  {
       this.router.navigate(["wallet"]);
        const data= await firstValueFrom(this.store.pipe(select(selectUserId),take(1)));
        this.service.buyCoin(this.valuta.kolicina-this.value, this.valuta.coin.id, data).subscribe((val:any)=>
        console.log(val));

  }
  updatevalue()
  {
    
    if(this.value>this.valuta.kolicina-1)
    {
      this.value=this.valuta.kolicina;
    }
  }
  ngOnInit()
  {
    this.subscription=this.store.select(selectCurrentCoin).subscribe((val:CoinState)=>{

      this.valuta=val;
      console.log(val)
      });
      
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
