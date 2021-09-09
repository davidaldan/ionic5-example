import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router }                             from '@angular/router';
import { AuthServiceService }                 from '../../service/models/auth-service.service';
import { MensajeService }                     from '../../service/functions/mensaje.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  usercreds = {
    email           : 'test@gmail.com',
    password        : '123456'
  };
  constructor(
    private fb                : FormBuilder,
    private authService       : AuthServiceService,
    private mensajeService    : MensajeService,
    private alertController   : AlertController,
    private router            : Router,
    private loadingController : LoadingController
    ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email   : [this.usercreds.email, [Validators.required, Validators.email]],
      password: [this.usercreds.password, [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    let response = await this.authService.login_(this.credentials.value, '', '');
    if(response['success']){
      await loading.dismiss(); 
      this.router.navigateByUrl('/home', { replaceUrl: true });      
    }else{
      await loading.dismiss();
      if(response['data']['code']=='data_verified_error'){
        //this.showConfirmReEnvio();
      }else{
        if(response['type'] == 'http'){

        }else{
          this.mensajeService.error_message(response['data']['response_type'], '', response['data']['response']);
        }
      }
    }
    
  }
 
  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }
  
  get password() {
    return this.credentials.get('password');
  }

}
