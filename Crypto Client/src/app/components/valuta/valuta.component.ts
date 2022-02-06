import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis } from 'ng-apexcharts';
import { Valuta } from 'src/app/Models/Valuta-model';
import { AppState } from 'src/app/store/app-state';
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
  @Input() valuta:Valuta|null={id:"id",ime:"Shib",cena:0.0003453333,rast:10,punoime:"Shiba inu",slika:"https://www.pngall.com/wp-content/uploads/10/Dogecoin-Crypto-Logo-PNG-Cutout.png"}
  @Input() grafik_podaci:Array<number> =[];
  public hide:boolean=false
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
    this.router.navigate(["/buy"])
  }
  sell()
  {
    this.router.navigate(["/sell"])
  }
  transfer()
  {
    this.router.navigate(["/transfer"])
  }
}
