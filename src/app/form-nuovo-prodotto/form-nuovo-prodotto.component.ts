import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriaServiceService } from '../categoria-service.service';
import { Categoria } from '../model/categoria';
import { Product } from '../model/product';
import { ProductServicesService } from '../product-services.service';

@Component({
  selector: 'app-form-nuovo-prodotto',
  templateUrl: './form-nuovo-prodotto.component.html',
  styleUrls: ['./form-nuovo-prodotto.component.css']
})
export class FormNuovoProdottoComponent implements OnInit {
  categorie: Categoria[]
  prodFor: FormGroup;
  messaggio: { msg: string, type: string };
  nuovoProdottoSub: Subscription;
  esito: { msg: string; type: string }

  @Input() modProdotto: Product;

  constructor(private router: Router, private servizioCategoria: CategoriaServiceService, private servizioProdotti: ProductServicesService) { }

  ngOnInit(): void {

    this.servizioCategoria.getCategorie().subscribe(
      categorie => this.categorie = categorie
    )



    this.prodFor = new FormGroup({
      nomeProdotto: new FormControl(this.modProdotto?.nome, Validators.required),
      categoria: new FormControl((this.modProdotto?.id_categoria), Validators.required),
      descrizione: new FormControl(this.modProdotto?.descrizione, Validators.required),
      prezzo: new FormControl(this.modProdotto?.prezzo, Validators.required),
      url: new FormControl(this.modProdotto?.src)
    })





  }

  get nomeProdotto(): AbstractControl {
    return this.prodFor.get('nomeProdotto');
  }
  get categoria(): AbstractControl {
    return this.prodFor.get('categoria');
  }
  get descrizione(): AbstractControl {
    return this.prodFor.get('descrizione');
  }
  get quantita(): AbstractControl {
    return this.prodFor.get('quantita');
  }
  get prezzo(): AbstractControl {
    return this.prodFor.get('prezzo');
  }
  get url(): AbstractControl {
    return this.prodFor.get('url');
  }


  nuovoProdotto() {

    const prod: Product = {
      nome: this.prodFor.get('nomeProdotto').value,
      descrizione: this.prodFor.get('descrizione').value,
      qta: this.prodFor.get('quantita').value,
      src: this.prodFor.get('url').value ? this.prodFor.get('url').value : 'default.jpg',
      prezzo: this.prodFor.get('prezzo').value,
      id_categoria: this.findCategory()
    };


    this.nuovoProdottoSub = this.servizioProdotti.aggiungiProdotto(prod).subscribe(

      () => {

        this.esito = {
          msg: 'Prodotto inserito con successo',
          type: 'alert-success'
        };
        setTimeout(() => {
          this.router.navigateByUrl('/lista/admin');
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

  modificaProdotto(): void {

    const prod: Product = {
      id: this.modProdotto.id,
      nome: this.prodFor.get('nomeProdotto').value,
      descrizione: this.prodFor.get('descrizione').value,
      qta: this.modProdotto.qta,
      src: this.prodFor.get('url').value ? this.prodFor.get('url').value : 'default.jpg',
      prezzo: this.prodFor.get('prezzo').value,
      id_categoria: this.findCategory()
    };

    //console.log(prod)
    
    this.servizioProdotti.modificaProdotto(prod).subscribe(

      () => {

        this.esito = {
          msg: 'Prodotto modificato con successo',
          type: 'alert-success'
        };

        setTimeout(() => {
          window.location.reload()
        }, 1000);
        

      },
      (error: HttpErrorResponse) => {
        this.esito = {
          msg: error.error.msg,
          type: 'alert-danger'
        };
      }

    )
    

  }




  findCategory(): number {
    for (const cat of this.categorie) {
      if (cat.nome === this.prodFor.get('categoria').value) {
        return cat.id;
      }
    }
    return this.prodFor.get('categoria').value;
  }


  ngOnDestroy() {
    if (this.nuovoProdottoSub) {
      this.nuovoProdottoSub.unsubscribe();
    }
  }

  getCategoria(indice: number): string {


    for (const cat of this.categorie) {
      if (cat.id === indice) {
        return cat.nome;
      }
    }
    return 'pippo';
  }

}
