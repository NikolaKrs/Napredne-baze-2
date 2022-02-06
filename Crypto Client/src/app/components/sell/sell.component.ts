import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common'

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

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
  ngOnInit() {
  }

}
