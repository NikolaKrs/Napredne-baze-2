import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common'
import { Valuta } from 'src/app/Models/Valuta-model';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { selectCurrentCoin } from 'src/app/store/coin/coin.selectors';
import { Market } from 'src/app/Models/Market-model';
import * as market from 'src/app/services/market.service';
import { firstValueFrom, Subscription, take } from 'rxjs';
import { selectLogin, selectUser, selectUserId } from 'src/app/store/korisnik/korisnik.selectors';
import { CoinState } from 'src/app/store/coin/coin.reducer';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  constructor(private router:Router,private _location: Location,private store: Store<AppState>,private service: market.MarketService) { }
  valuta: CoinState;
  value=0;
  subscription: Subscription
  data:any;
  handleMinus() {
    if(this.value>=1)
    {
      this.value--;  
    }
  }
  handlePlus() {
    this.value++;    
  }
  ngOnInit() 
  {
     this.subscription= this.store.select(selectCurrentCoin).subscribe((val:CoinState)=>{

        this.valuta=val;
        console.log(val)
        });
  
  }

  back()
  {
    this._location.back();
  }
  async buy()
  {
      var log= await firstValueFrom(this.store.pipe(select(selectLogin),take(1)));
      if(log)
      {
        this.router.navigate(["wallet"]);
        this.data= await firstValueFrom(this.store.pipe(select(selectUserId),take(1)));
        this.service.buyCoin(this.value/this.valuta.coin.cena+this.valuta.kolicina, this.valuta.coin.id, this.data).subscribe((val:any)=>
        console.log(val));
       
      }
      else
      {
        this.router.navigate(["login"]);
      }
    //this._location.back();
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
 
}
