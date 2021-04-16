import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {User} from '../app/model/user';



@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  loggedUser: User;

  //Inietto la chiamata Http
  constructor(private http: HttpClient) { }

  //Prende uno user, grazie alla tap riesco a salvare lo user restituito dal server nella variabile
  public login(user: {email: string, password: string}): Observable<User> {
    return this.http.post<User>('http://localhost:8000/api/login', user).pipe(
      tap(user => this.loggedUser = user)
    )

  }





}
