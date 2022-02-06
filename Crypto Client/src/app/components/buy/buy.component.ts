import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common'
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  constructor(private router:Router,private _location: Location) { }
  value = 0;

  handleMinus() {
    if(this.value>=1)
    {
      this.value--;  
    }
  }
  handlePlus() {
    this.value++;    
  }
  ngOnInit() {
  }
  back()
  {
    this._location.back();
  }
  buy()
  {
    this._location.back();
  }
}
