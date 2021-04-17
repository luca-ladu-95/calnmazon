import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormNuovoProdottoComponent } from './form-nuovo-prodotto/form-nuovo-prodotto.component';
import { FormRegistrazioneComponent } from './form-registrazione/form-registrazione.component';
import { HomeComponent } from './home/home.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { LisaprodottiComponent } from './lisaprodotti/lisaprodotti.component';

const routes: Routes = [
  {path:"", redirectTo:'/login',pathMatch:'full'},
  {path:"login",component:FormLoginComponent},
  {path:"home/admin",component:HomeadminComponent},
  {path:"lista/admin",component:LisaprodottiComponent},
  {path:"nuovoprodotto/admin",component:FormNuovoProdottoComponent},
  {path:"home",component:HomeComponent},
  {path:"registrazione",component:FormRegistrazioneComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
