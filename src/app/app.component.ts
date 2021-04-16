import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from './user-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public href: string = "";

    constructor(private router: Router,private userService: UserServicesService) {

      
     
    }

    ngOnInit() {
        
    }

    getNomeUtente():string{
      if(this.userService.loggedUser)
      return this.userService.loggedUser.nome
      else return null
    }


    getUrl():boolean{

      this.href = this.router.url;
      if(this.href == '/' || this.href == '/login' || this.href=='/registrazione')
      return true
      else return false

    }
}
