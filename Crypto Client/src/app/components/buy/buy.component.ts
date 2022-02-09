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

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  constructor(private router:Router,private _location: Location,private store: Store<AppState>,private service: market.MarketService) { }
  valuta: Valuta;
  value=0;
  subscription: Subscription
  subuser: Subscription
  subusername:Subscription
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
     this.subscription= this.store.select(selectCurrentCoin).subscribe((val:Valuta)=>{

        this.valuta=val;
        console.log(val)
        });
  
  }

  back()
  {
    this._location.back();
  }
  buy()
  {
    this.subuser=this.store.select(selectLogin).subscribe(async (val:any)=>
    {
      if(val)
      {
        this.data= await firstValueFrom(this.store.pipe(select(selectUserId),take(1)))/*.toPromise().then((value) => {
          return value;
        });*/
        console.log(this.data);
        console.log(this.valuta.id);
        console.log(this.value);
        this.service.buyCoin(this.value, this.valuta.id, this.data).subscribe((val:any)=>
        console.log(val));
      }
      else
      {
        this.router.navigate(["login"]);
      }
    })
    this.subuser.unsubscribe();
   
    //this._location.back();
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
 
}
