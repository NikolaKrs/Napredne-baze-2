import { Component, OnInit } from '@angular/core';
import { Valuta } from 'src/app/Models/Valuta-model';

@Component({
  selector: 'app-valute',
  templateUrl: './valute.component.html',
  styleUrls: ['./valute.component.css']
})
export class ValuteComponent implements OnInit {

  public grafik_podaci:Array<number> =[1,2,3,-4,5,0,0,1,1,1,1,1,1,1,1];
  public valute:Array<Valuta> =[];
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 10; i++)
     {
   this.valute.push( {id:"id",ime:"Shib",cena:0.53333,rast:i%2==0?-10:10,punoime:"Shiba inu",slika:"https://www.pngall.com/wp-content/uploads/10/Dogecoin-Crypto-Logo-PNG-Cutout.png"});
    }
  }

}
