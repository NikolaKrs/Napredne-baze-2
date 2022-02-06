import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from 'ng-apexcharts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValutaComponent } from './components/valuta/valuta.component';
import { GrafikComponent } from './components/grafik/grafik.component';
import { SparklineModule } from '@syncfusion/ej2-angular-charts';
import { BuyComponent } from './components/buy/buy.component';
import { ValuteComponent } from './components/valute/valute.component';
import { StoreModule } from '@ngrx/store';
import { marketReducer } from './store/market/market.reducer';
import { korisnikReducer } from './store/korisnik/korisnik.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { KorisnikEffect } from './store/korisnik/korisnik.effects';
import { MarketEffect } from './store/market/market.effects';
import { KorisnikService } from './services/korisnik.service';
import { MarketService } from './services/market.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    ValutaComponent,
    GrafikComponent,
    BuyComponent,
    ValuteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule,
    SparklineModule,
    HttpClientModule,
    StoreModule.forRoot({market: marketReducer, korisnik: korisnikReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),

    EffectsModule.forRoot([MarketEffect,KorisnikEffect])
  ],
  providers: [KorisnikService,MarketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
