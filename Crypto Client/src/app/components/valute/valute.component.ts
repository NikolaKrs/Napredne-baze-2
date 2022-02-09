import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Valuta } from 'src/app/Models/Valuta-model';
import { AppState } from 'src/app/store/app-state';
import * as market from 'src/app/services/market.service';
import { selectCoin, selectCoins } from 'src/app/store/market/market.selectors';
import { selectUserCoins } from 'src/app/store/korisnik/korisnik.selectors';
import { KorisnikValuta } from 'src/app/Models/korisnikValuta-model';
import {
  elementAt,
  firstValueFrom,
  lastValueFrom,
  map,
  Subscription,
  take,
} from 'rxjs';

@Component({
  selector: 'app-valute',
  templateUrl: './valute.component.html',
  styleUrls: ['./valute.component.css'],
})
export class ValuteComponent implements OnInit {
  public grafik_podaci: Array<number> = [
    1, 2, 3, -4, 5, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  public valute: Array<{ valuta: Valuta; kolicina: number }> = [];
  public valuteKolicina: Array<number>;
  constructor(
    private store: Store<AppState>,
    private service: market.MarketService
  ) {}
  @Input() wallet_or_home: string = 'home';
  @Input() show: boolean = false;
  korVal: KorisnikValuta[];
  sub: Subscription;
  async ngOnInit() {
    if (this.wallet_or_home == 'home') {
      this.store.select(selectCoins).subscribe((val: Valuta[]) => {
        this.valute = val.map((val) => ({ valuta: val, kolicina: 0 }));
        console.log(val);
      });
    } else if (this.wallet_or_home == 'wallet') {
      if (!this.sub) {
        console.log("aaaaaa")
        //var log= await lastValueFrom(this.store.pipe(select(selectUserCoins),take(1)));
        this.sub = this.store
          .select(selectUserCoins)
          .pipe()
          .subscribe((val: KorisnikValuta[]) => {
            this.korVal = val;
            console.log('this.korVal');
            this.valute=[]
            this.korVal.forEach(async (element) => {
              this.valute.push({
                valuta: await firstValueFrom(
                  this.store.pipe(
                    select(selectCoin(element.valutaRef)),
                    take(1)
                  )
                ),
                kolicina: element.kolicina,
              });
              console.log(this.valute);
            });
          });
      }
    }
    
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
