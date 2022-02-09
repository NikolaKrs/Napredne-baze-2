import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Korisnik } from './Models/Korisnik-model';
import { Valuta } from './Models/Valuta-model';
import { AppState } from './store/app-state';
import { loadUserStart } from './store/korisnik/korisnik.actions';
import * as korisnikService from '../app/services/korisnik.service'
import { loadCoinsStart, loadMarketStart } from './store/market/market.actions';
import { ThumbSettings } from '@syncfusion/ej2-angular-charts';
import { selectLogin, selectUser } from './store/korisnik/korisnik.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Crypto';
  login:boolean=true;
  korisnik:Korisnik|null=null;
  constructor(private router: Router,private store: Store<AppState>,private servis:korisnikService.KorisnikService){}
  ngOnInit() {
    this.store.dispatch(loadMarketStart());
    this.store.dispatch(loadCoinsStart());
    this.router.navigate(["home"])
    this.store.select(selectUser).subscribe((val:Korisnik)=>
    {
      if(val!=null)
      {
        this.korisnik=val;
      }
    });
    this.store.select(selectLogin).subscribe((val:boolean)=>
    {
      this.login=val;
    });
  }
  wallet()
  {
    this.router.navigate(["wallet"])
  }
  Login()
  {
    this.router.navigate(["login"])
  }
    //this.store.dispatch(loadUserStart({korisnickoIme: username,sifra:password}));
  

}
