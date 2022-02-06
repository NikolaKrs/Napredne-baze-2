import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyComponent } from './components/buy/buy.component';
import { SellComponent } from './components/sell/sell.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { ValuteComponent } from './components/valute/valute.component';

const routes: Routes = [
  {
    path:"buy",
    component:BuyComponent
  },
  {
    path:"valute",
    component:ValuteComponent
  },
  {
    path:"sell",
    component:SellComponent
  },
  {
    path:"transfer",
    component:TransferComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
