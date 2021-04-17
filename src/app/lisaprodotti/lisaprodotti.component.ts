import { HttpErrorResponse } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriaServiceService } from '../categoria-service.service';
import { Categoria } from '../model/categoria';
import { Product } from '../model/product';
import { ProductServicesService } from '../product-services.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lisaprodotti',
  templateUrl: './lisaprodotti.component.html',
  styleUrls: ['./lisaprodotti.component.css']
})
export class LisaprodottiComponent implements OnInit {

  listaProdotti : Product[]
  categorie: Categoria[]
  messaggio: {msg: string, type: string};
  prodSub: Subscription;
  product:Product;
  modificaProd:FormGroup;
  flag = true;




  //Inietto il servizio prodotti
  constructor(private servizioProdotti :ProductServicesService,private servizioCategoria :CategoriaServiceService) { }

  ngOnInit(): void {

    //Recupero la lista prodotti dal servizio
    this.servizioProdotti.getProdotti()

    this.servizioProdotti.prodottiUpd.subscribe(()=>{
      this.listaProdotti = this.servizioProdotti.prodotti;
    })

    this.servizioCategoria.getCategorie().subscribe(
      categorie => this.categorie = categorie
    )


  }


  getCategoria(indice:number):string{

    
    for(const cat of this.categorie){
      if(cat.id === indice){
        return cat.nome;
      }
    }
    return 'pippo';
  }

  delete(index:number){
    this.servizioProdotti.eliminaProdotto(index).subscribe(
      (esito: {msg: string})=>{
        this.messaggio = {
          msg: esito.msg,
          type: 'alert-success'
        };
    },
    (error: HttpErrorResponse) => {
      this.messaggio = {
        msg: error.error.msg,
        type: 'alert-danger'
      };
    });
  }

  getClass(){
    if(this.flag) return "col-12"
    else return "col-7"
  }


  modifica(prodotto:Product){



    this.product= prodotto;
    this.flag = false;


    /*this.modificaProd = new FormGroup({
      nomeProdotto : new FormControl(prodotto.nome,Validators.required),
      categoria : new FormControl(prodotto.id_categoria,Validators.required),
      descrizione : new FormControl(prodotto.descrizione,Validators.required),
      quantita : new FormControl(prodotto.qta,Validators.required),
      prezzo : new FormControl(prodotto.prezzo,Validators.required),
      url : new FormControl(prodotto.src)
    })*/

  }



  

  




  




   




}
