import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductServicesService } from '../product-services.service';

@Component({
  selector: 'app-lisaprodotti',
  templateUrl: './lisaprodotti.component.html',
  styleUrls: ['./lisaprodotti.component.css']
})
export class LisaprodottiComponent implements OnInit {

  listaProdotti : Product[]

  constructor(private servizioProdotti :ProductServicesService) { }

  ngOnInit(): void {

    this.servizioProdotti.getProdotti().subscribe(
      listaProdotti=> this.listaProdotti = listaProdotti
    )

  }




   




}
