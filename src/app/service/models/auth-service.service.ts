import { Platform }         from '@ionic/angular';
import { Injectable }       from '@angular/core';
import { Storage }          from '@ionic/storage';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router }           from '@angular/router';
import { StorageService }   from '../functions/storage.service';
import {HttpDataService }   from '../functions/http-data.service';


const helper      = new JwtHelperService();
const USER_KEY    = 'jwt-user';
const TOKEN_KEY   = 'token';
const ISAUTH_KEY  = 'is-authenticated';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  private userData = new BehaviorSubject(null);
  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  
  constructor(
    private storage         : Storage, 
    private router          : Router,
    private storageService  : StorageService,
    private HttpData        : HttpDataService
  ){
    this.loadStoredToken();  
  }

  async loadStoredToken() {
    console.log('loadStoredToken');
    await this.getStoredToken();
  }

  async getStoredToken(){
    let token = await this.storageService.get(USER_KEY);
    if (token) {
      let decoded = helper.decodeToken(token); 
      this.userData.next(decoded);
      this.isAuthenticated.next(true);
      return true;
    } else {
      this.isAuthenticated.next(false);
      return false;
    }
  }

  async getIsAuthenticated(){
    let auth = await this.storageService.get(ISAUTH_KEY);
    if(auth){
      return true;
    }else{
      return false;
    }
  }

  async login_(credentials, fcm, uuid) {
    let data = {
      email       : credentials.email,
      password    : credentials.password,
      token_fcm   : fcm,
      token_uuid  : uuid
    };

    let response = await this.HttpData.httpAuth({method:'auth/login', send: data}).toPromise();
    if(response['success']){
      let jwt_user      = response['data']['response']['jwt_user'];
      let access_token  = response['data']['response']['access_token'];
      let decoded = helper.decodeToken(jwt_user);
      this.userData.next(decoded);
      await this.storageService.set(ISAUTH_KEY, true);
      await this.storageService.set(USER_KEY, jwt_user);
      await this.storageService.set(TOKEN_KEY, access_token);
      return response;
    }else{
      return response;
    }
  }
 
  getUser() {
    return this.userData.getValue();
  }
 
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/');
      this.userData.next(null);
      this.isAuthenticated.next(false);
    });
  }

}
