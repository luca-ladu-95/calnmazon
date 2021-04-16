import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserServicesService } from '../user-services.service';



@Component({
  selector: 'app-form-registrazione',
  templateUrl: './form-registrazione.component.html',
  styleUrls: ['./form-registrazione.component.css']
})
export class FormRegistrazioneComponent implements OnInit {

  signForm: FormGroup;
  regSubscription: Subscription;
  esito: { msg: string; type: string }



  constructor(private userService: UserServicesService, private router: Router) { }

  ngOnInit(): void {
    this.signForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      cognome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      via: new FormControl('', Validators.required),
      citta: new FormControl('', Validators.required),
      cap: new FormControl('', Validators.required),
      numCarta: new FormControl('', Validators.required),
      codice: new FormControl('', Validators.required),
      meseScadenza: new FormControl('', Validators.required),
      annoScadenza: new FormControl('', Validators.required)
    })
  }

  get nome(): AbstractControl {
    return this.signForm.get('nome');
  }
  get cognome(): AbstractControl {
    return this.signForm.get('cognome');
  }
  get email(): AbstractControl {
    return this.signForm.get('email');
  }
  get password(): AbstractControl {
    return this.signForm.get('password');
  }
  get via(): AbstractControl {
    return this.signForm.get('via');
  }
  get citta(): AbstractControl {
    return this.signForm.get('citta');
  }
  get cap(): AbstractControl {
    return this.signForm.get('cap');
  }
  get numCarta(): AbstractControl {
    return this.signForm.get('numCarta');
  }
  get codice(): AbstractControl {
    return this.signForm.get('codice');
  }
  get meseScadenza(): AbstractControl {
    return this.signForm.get('meseScadenza');
  }
  get annoScadenza(): AbstractControl {
    return this.signForm.get('annoScadenza');
  }

  registrazione(): void {
    const userSigningUp = {
      email: this.signForm.get('email').value,
      password: this.signForm.get('password').value,
      nome: this.signForm.get('nome').value,
      cognome: this.signForm.get('cognome').value,
      ruolo: "1",
      indirizzo: {
        via: this.signForm.get('via').value,
        citta: this.signForm.get('citta').value,
        cap: this.signForm.get('cap').value
      },
      metodoPagamento: {
        numero: this.signForm.get('numCarta').value,
        codice: this.signForm.get('codice').value,
        mese_scadenza: this.signForm.get('meseScadenza').value,
        anno_scadenza: this.signForm.get('annoScadenza').value
      }

    }


    this.regSubscription = this.userService.sinUp(userSigningUp).subscribe(

      (user) => {
        this.esito = {
          msg: 'Registrazione effettuata con successo',
          type: 'alert-success'
        };

        setTimeout(() => {
          if (user.ruolo == 1) {
            this.router.navigateByUrl('/home/admin');
          } else {
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

    )

  }

}
