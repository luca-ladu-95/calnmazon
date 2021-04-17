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


  public eliminaProdotto(index){
  
    return this.http.delete('http://localhost:8000/api/deleteProduct/'+ index).pipe(
      tap(() => {
        this.prodotti = this.prodotti.filter(p => p.id !== index);
        this.prodottiUpd.next()
      })
    )

  }

  public aggiungiProdotto(prodotto:Product):Observable<Product>{
    return this.http.post<Product>('http://localhost:8000/api/aggiungiProdotto',prodotto)
  }

  public modificaProdotto(prodotto:Product){

    return this.http.put<Product>('http://localhost:8000/api/modificaProdotto',prodotto).pipe(
      tap(
        ()=> {
          
          this.prodotti.splice(this.getIndex(prodotto),1,prodotto);
         // console.log(this.prodotti)
          this.prodottiUpd.next()
        })
    )
  }

  private getIndex(prodotto:Product):number{
    for(let i=0; i< this.prodotti.length;i++){

      if(prodotto.id == this.prodotti[i].id){
    
        return i
      }
    }

    return 0;
  }


}
