import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../service/models/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {

  constructor(private router: Router, private auth: AuthServiceService ) { }

  async canLoad() { //Promise<boolean>
    let isAuth = await this.auth.getIsAuthenticated();
    if(isAuth){
      this.router.navigateByUrl('/home', { replaceUrl: true });
      //return <boolean> true;
    }else{
      return <boolean> true;
    }
  }
  
}
