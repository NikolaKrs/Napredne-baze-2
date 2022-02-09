import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/Models/Korisnik-model';
import * as KorisnikService from '../../services/korisnik.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  korisnik:Korisnik ={korisnickoIme: "", ime:"",prezime:"", sifra:"", korisnickeValute:[]}
  constructor(/*private store: Store<AppState>,*/private service:KorisnikService.KorisnikService,private router: Router) { }

  ngOnInit() 
  {
    
  }
  register()
  {
    this.service.insertUser(this.korisnik).subscribe((val:any)=>
    {
      console.log(val)
    }
    )
    this.router.navigate(["login"]);
  }

}
