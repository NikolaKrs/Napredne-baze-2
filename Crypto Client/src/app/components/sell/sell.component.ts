import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common'
import { Valuta } from 'src/app/Models/Valuta-model';
import { selectCurrentCoin } from 'src/app/store/coin/coin.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { Subscription } from 'rxjs';
import { loadCoinsStart, loadMarketStart, loadMarketSuccess } from 'src/app/store/market/market.actions';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  constructor(private router:Router,private _location: Location,private store: Store<AppState>) { }
  value = 0;
  valuta: Valuta;
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
  back()
  {
    this._location.back();
  }
  buy()
  {
    this._location.back();
  }
  updatevalue(event:Event)
  {
    console.log((event.target as HTMLInputElement).value);
    this.value=(Number)((event.target as HTMLInputElement).value);
  }
  ngOnInit()
  {
    this.subscription=this.store.select(selectCurrentCoin).subscribe((val:Valuta)=>{

      this.valuta=val;
      console.log(val)
      });
      
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
