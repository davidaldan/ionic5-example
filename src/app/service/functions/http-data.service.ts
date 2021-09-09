import { Injectable }     from '@angular/core';
import {HttpClientModule, HttpClient, HttpErrorResponse} from '@angular/common/http';
import { map }            from 'rxjs/operators';
import { filter }         from 'rxjs/operators';
import { timeout }        from 'rxjs/operators';
import {catchError}       from 'rxjs/operators';
import { StorageService } from './storage.service';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  url     : String  = 'https://api.xxx.com/api/';
  idioma  : any     = 'es';
  
  constructor(
    private http: HttpClient,
    private storageService : StorageService
  ) { }

  httpget(data?) {
    //let currentlang = this.translate.currentLang; 
    let currentlang = 'es'; 
    if( typeof currentlang !== 'undefined'){
        this.idioma = currentlang;
    }
    let token = window.localStorage.getItem('token');
    //let token = this.storageService.get(TOKEN_KEY);
    let header = {headers: {
        'Content-Type'  : 'application/json',
        'Authorization' : 'Bearer '+token,
        'idioma'        : this.idioma
    }};  

    return this.http
      .get(this.url + data.method, header)
      .pipe(
        map( (resp : any) =>{
          console.log('data: ', resp);
          if (resp['success']) {
            return {success: true, data : resp};
          }else{
            return {success: false, type:'server' , data : resp};
          }
        }),
        catchError( (error: any) =>{
          console.log('error: ' , error);
          return <any> { success: false , type:'http' , data: { response:error['message'] }  };
        })
      )
  }

  httppost(data?) {
    //let currentlang = this.translate.currentLang; 
    let currentlang = 'es'; 
    if( typeof currentlang !== 'undefined'){
        this.idioma = currentlang;
    }
    let token = window.localStorage.getItem('token');
    //let token = this.storageService.get(TOKEN_KEY);
    let header = {headers: {
        'Content-Type'  : 'application/json',
        'Authorization' : 'Bearer '+token,
        'idioma'        : this.idioma
    }};  
    console.log('header: ', header);
    return this.http
      .post(this.url + data.method, data.send, header)
      .pipe(
        map( (resp : any) =>{
          console.log('data: ', resp);
          if (resp['success']) {
            return {success: true, data : resp};
          }else{
            return {success: false, type:'server' , data : resp};
          }
        }),
        catchError( (error: any) =>{
          console.log('error: ' , error);
          return <any> { success: false , type:'http' , data: { response:error['message'] }  };
        })
      )
  }

  httpAuth(data?) {
    //let currentlang = this.translate.currentLang; 
    let currentlang = 'es'; 
    if( typeof currentlang !== 'undefined'){
        this.idioma = currentlang;
    }
    let header = {headers: {
        'Content-Type'  : 'application/json',
        'idioma'        : this.idioma
    }};  
    return this.http
      .post(this.url + data.method, data.send, header)
      .pipe(
        map( (resp : any) =>{
          if (resp['success']) {
            return {success: true, data : resp};
          }else{
            return {success: false, type:'server' , data : resp};
          }
        }),
        catchError( (error: any) =>{
          console.log('error: ' , error);
          return <any> { success: false , type:'http' , data: { response:error['message'] }  };
        })
      )
  }

}
