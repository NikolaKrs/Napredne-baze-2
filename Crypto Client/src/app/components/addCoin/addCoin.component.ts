import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SResponse } from 'src/app/Models/response';
import { Valuta } from 'src/app/Models/Valuta-model';
import * as market from 'src/app/services/market.service';

@Component({
  selector: 'app-addCoin',
  templateUrl: './addCoin.component.html',
  styleUrls: ['./addCoin.component.css']
})
export class AddCoinComponent implements OnInit {

  coin:Valuta={id:'',ime:'',cena:0,rast:0,slika:'',punoime:''}
  constructor(private service: market.MarketService,private router:Router) { }

  ngOnInit() {
  }
  addCoin()
  {
    this.service.insertCoin(this.coin).subscribe((val:SResponse)=>
    {
      console.log(val)
    });
    this.router.navigate(['home']);
  }

}
