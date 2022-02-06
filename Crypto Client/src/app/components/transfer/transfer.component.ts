import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common'

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  constructor(private router:Router,private _location: Location) { }
  value = 0;
  selected="";
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
    this.selected=(event.target as HTMLSelectElement).value;
    console.log((event.target as HTMLSelectElement).value);
  }
  ngOnInit() {
  }
}
