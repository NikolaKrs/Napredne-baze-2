import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyComponent } from './components/buy/buy.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SellComponent } from './components/sell/sell.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { ValuteComponent } from './components/valute/valute.component';
import { WalletComponent } from './components/wallet/wallet.component';

const routes: Routes = [
  {
    path:"buy",
    component:BuyComponent
  },
  {
    path:"home",
    component:ValuteComponent
  },
  {
    path:"sell",
    component:SellComponent
  },
  {
    path:"transfer",
    component:TransferComponent
  },
  {
    path:"wallet",
    component:WalletComponent
  }
  ,
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
