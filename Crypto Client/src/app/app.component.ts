import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Valuta } from './Models/Valuta-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Crypto';
  constructor(private router: Router){}
  ngOnInit() {
    this.router.navigate(["valute"])
    
  }

}
