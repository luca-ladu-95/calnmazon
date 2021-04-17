import { Component, OnInit } from '@angular/core';
import { CategoriaServiceService } from '../categoria-service.service';
import { Product } from '../model/product';
import { ProductServicesService } from '../product-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  prodotti : Product[]
  constructor(private servizioProdotti :ProductServicesService,private servizioCategoria :CategoriaServiceService) { }

  ngOnInit(): void {

    //Recupero la lista prodotti dal servizio
    this.servizioProdotti.getProdotti()

    this.servizioProdotti.prodottiUpd.subscribe(()=>{
      this.prodotti = this.servizioProdotti.prodotti;
    })
  }

}
