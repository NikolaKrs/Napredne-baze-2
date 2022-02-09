import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common'
import { Valuta } from 'src/app/Models/Valuta-model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { selectCurrentCoin } from 'src/app/store/coin/coin.selectors';
import { Market } from 'src/app/Models/Market-model';
import * as market from 'src/app/services/market.service';
import { MarkerSeries } from 'igniteui-angular-charts';
import { Subscription } from 'rxjs';
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
    this._location.back();
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
 
}
