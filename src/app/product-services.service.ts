import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Product } from './model/product';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {

  prodotti:Product[];
  prodottiUpd = new Subject();


  constructor(private http: HttpClient) { }


 

  public getProdotti(){
    this.http.get<Product[]>('http://localhost:8000/api/product')
    .subscribe(prodotti => {
      this.prodotti = prodotti;
      this.prodottiUpd.next();
    })
  }


  eliminaProdotto(index){
  
    return this.http.delete('http://localhost:8000/api/deleteProduct/'+ index).pipe(
      tap(() => {
        this.prodotti = this.prodotti.filter(p => p.id !== index);
        this.prodottiUpd.next()
      })
    )

  }


}
