import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Product } from './model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {

  prodotti:Product[] = [];

  constructor(private http: HttpClient) { }


  getProdotti(){

    return this.http.get<Product[]>('http://localhost:8000/api/product').pipe(
     tap(prodotti => this.prodotti = prodotti)
    )
  }

}
