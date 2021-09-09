import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private alertController: AlertController, public toastController: ToastController) { }

  async error_message(type, header, message){
    if(type=='text'){
      this.showAlert(header, message);
    }else{
      this.showToast(header, message, 'top');
    }
  }

  async showAlert(header, message){
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showToast(header, message, position) {
    const toast = await this.toastController.create({
      header: header,
      message: message,
      position: position,
      duration: 2000
    });
    toast.present();
  }

}
