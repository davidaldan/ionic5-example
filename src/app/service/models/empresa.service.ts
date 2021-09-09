import { Injectable }     from '@angular/core';
import {HttpDataService } from '../functions/http-data.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private HttpData : HttpDataService) { }

  async get_list(data_){
    let data = {
    };
    return await this.HttpData.httppost({method:'get_list', send: data}).toPromise();
  }

}
