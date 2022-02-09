import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/Models/Korisnik-model';
import * as korisnikService from '../../services/korisnik.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  korisnik:Korisnik={ime:"",prezime:"",values:[],password:"",username:"",id:""};
  username:string="";
  password:string="";
  constructor(private servis:korisnikService.KorisnikService,private router: Router) { }

  ngOnInit() {
  }

  wallet()
  {
    this.Login(this.username,this.password);
    this.router.navigate(["home"])
  }
  Login(username:string,password:string)
  {
    this.servis.login(username,password).subscribe((val:any)=>
    {
      if(val!=null)
      {
        this.korisnik=val;
        console.log(val);
      }
      
    });
    //this.store.dispatch(loadUserStart({korisnickoIme: username,sifra:password}));
  }
  Username(e:Event)
  {

  }
  Password(e:Event)
  {
    
  }

}
