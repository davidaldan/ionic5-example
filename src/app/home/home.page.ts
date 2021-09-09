import { Component }          from '@angular/core';
import { EmpresaService }     from '../service/models/empresa.service';
import { AuthServiceService } from '../service/models/auth-service.service';
import { MensajeService }     from '../service/functions/mensaje.service';
import { Router }             from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user                  = null;
  http_error            : boolean = false;
  show_data             : boolean = false;
  data_list             : any = [];
  showLocationDetail    = false;
  online_profile        : any;

  constructor(
    private empresa         : EmpresaService, 
    private authService     : AuthServiceService,
    private mensajeService  : MensajeService,
    private router          : Router
    ) {
      this.get_list();
    }

    ionViewWillEnter() {
      this.user = this.authService.getUser();
      this.online_profile = 1;
    }  

  async get_list(){
    let response = await this.empresa.get_list({});
    if(response['success']){
      this.http_error     = false;
      this.show_data      = true;
      this.data_list      = response['data']['response']['empresas'];
    }else{
      if(response['type'] == 'http'){
        this.http_error = true;
      }else{
        this.mensajeService.error_message(response['data']['response_type'], '', response['data']['response']);
      }
    }
  }

  go_panel_x(slug, key_modulo){
    //this.router.navigate(['/xxx']);
  }

  onScroll(ev) {
    const offset = ev.detail.scrollTop;
    this.showLocationDetail = offset > 40;
  }

  myChangeStatus($event) {
    console.log($event);
  }

}
