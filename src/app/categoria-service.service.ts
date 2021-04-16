import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Categoria } from './model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaServiceService {

  categorie:Categoria[]

  constructor(private http:HttpClient) { }


  getCategorie(){

    return this.http.get<Categoria[]>('http://localhost:8000/api/category').pipe(
      tap(categorie => this.categorie = categorie)
     )

  }
}
