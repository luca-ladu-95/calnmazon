import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { HomeComponent } from './home/home.component';
import { FormRegistrazioneComponent } from './form-registrazione/form-registrazione.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { LisaprodottiComponent } from './lisaprodotti/lisaprodotti.component';
import { FormNuovoProdottoComponent } from './form-nuovo-prodotto/form-nuovo-prodotto.component';

@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    HomeComponent,
    FormRegistrazioneComponent,
    HomeadminComponent,
    LisaprodottiComponent,
    FormNuovoProdottoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
