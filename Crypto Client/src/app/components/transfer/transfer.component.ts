import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common'
import { Valuta } from 'src/app/Models/Valuta-model';
import { selectCurrentCoin } from 'src/app/store/coin/coin.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { Subscription } from 'rxjs';
import * as market from 'src/app/services/market.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  constructor(private router:Router,private _location: Location,private store: Store<AppState>,private service: market.MarketService) { }
  value = 0;
  selected:Valuta={id:"",ime:"",cena:0,rast:0,punoime:"",slika:""};;
  valuta: Valuta;
  subscription: Subscription;
  public valute:Valuta[];
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
  select(event:Event)
  {
    this.selected=this.valute[Number((event.target as HTMLSelectElement).value)];
    console.log(this.selected);
  }
  ngOnInit() 
  {
    this.subscription=this.store.select(selectCurrentCoin).subscribe((val:Valuta)=>{

      this.valuta=val;
      console.log(val)
      });

      this.service.getValuta().subscribe((val:Valuta[])=>{
        this.valute=val;
        console.log(val)
      });
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
