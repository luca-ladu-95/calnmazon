import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserServicesService } from '../user-services.service';


@Component({
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit, OnDestroy {

  //Form preso dalla html
  mioForm: FormGroup;
  //Subscription 
  loginSub: Subscription;
//Messaggio di esito
  esito: {msg: string; type: string};

  //Nel costruttore inietto il servizio della Login che restituisce un Observable
  constructor(private http: HttpClient, private userService: UserServicesService,private router: Router) { }

  ngOnInit(): void {
    //Quando inizializzo creo il form con i validators
    this.mioForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  login() {

    //Mi prendo i parametri dal form
    const user = {
      email: this.mioForm.get('email').value,
      password: this.mioForm.get('password').value
    }



    
    this.loginSub = this.userService.login(user).subscribe(
      (user) => {
        this.esito = {
          msg: 'Login effettuato con successo',
          type: 'alert-success'
        };
        setTimeout(() => {
          if(user.ruolo == 1){
          this.router.navigateByUrl('/home/admin');
          }else{
            this.router.navigateByUrl('home')
          }
        }, 1500);
      },
      (error: HttpErrorResponse) => {
        this.esito = {
          msg: error.error.msg,
          type: 'alert-danger'
        };
      }
    );


  }

  //Qunado distruggo è bene che disallochi le risorse
  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }


}
