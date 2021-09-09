import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router  } from '@angular/router';
import { of, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from '../service/models/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthServiceService, private alertCtrl: AlertController) { }

  async canActivate(route: ActivatedRouteSnapshot) {
    let user = await this.auth.getStoredToken();
    if (!user) {
      this.alertCtrl.create({
        header: 'Unauthorized',
        message: 'You are not allowed to access that page.',
        buttons: ['OK']
      }).then(alert => alert.present());

      this.router.navigateByUrl('login');
      return  <boolean> false;
      //return of(false);
    } else {
      return <boolean> true;
      //return of(true);
    }
  }
  
}
