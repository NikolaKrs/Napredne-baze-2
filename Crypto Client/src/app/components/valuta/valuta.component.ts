import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis } from 'ng-apexcharts';
import { Valuta } from 'src/app/Models/Valuta-model';
import { AppState } from 'src/app/store/app-state';
import * as Actions from 'src/app/store/coin/coin.actions';
import { selectCurrentCoin } from 'src/app/store/coin/coin.selectors';
EffectsModule
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-valuta',
  templateUrl: './valuta.component.html',
  styleUrls: ['./valuta.component.css']
})
export class ValutaComponent implements OnInit {
  @Input() valuta:{valuta:Valuta,kolicina:number}|null={valuta:{id:"id",ime:"Shib",cena:0.0003453333,rast:10,punoime:"Shiba inu",slika:"https://www.pngall.com/wp-content/uploads/10/Dogecoin-Crypto-Logo-PNG-Cutout.png"},kolicina:0}
  @Input() grafik_podaci:Array<number> =[];
  public hide:boolean=false
  @Input()  show:boolean=false
  constructor(private router: Router,private store: Store<AppState>){}
 
  ngOnInit(): void
  {
   
  }
  click()
  {
    console.log("klik")
    this.hide=!this.hide;
    
  }
  buy()
  {
    if(this.valuta!=null)
    {
      this.store.dispatch(Actions.SetCurrentCoin({coin:{coin:this.valuta.valuta,kolicina:this.valuta.kolicina}}))
    }
    this.router.navigate(["/buy"])
  }
  sell()
  {
    if(this.valuta!=null)
    {
      this.store.dispatch(Actions.SetCurrentCoin({coin:{coin:this.valuta.valuta,kolicina:this.valuta.kolicina}}))
    }
    this.router.navigate(["/sell"])
  }
  transfer()
  {
    if(this.valuta!=null)
    {
      this.store.dispatch(Actions.SetCurrentCoin({coin:{coin:this.valuta.valuta,kolicina:this.valuta.kolicina}}))
    }
    this.router.navigate(["/transfer"])
  }
}
