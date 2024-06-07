import { Injectable } from '@angular/core';
import { PopoverController, AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  constructor(public popoverController: PopoverController,
    private alertController: AlertController, private toastController: ToastController) { }



async alertDialog(head: string, msg: string): Promise<void | boolean> {
  let resolveFunction: (choice: boolean) => void;
  const promise = new Promise<boolean>(resolve => {
    resolveFunction = resolve;
  });
  const alert = await this.alertController
      .create({
        header: head, message: msg,
        mode:"ios",
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Continue',
            handler: () => resolveFunction(true)
          }
        ]
      });
  await alert.present();
  return promise;
}




async alertPromise(head: string, msg: string): Promise<void | boolean> {
  let resolveFunction: (choice: boolean) => void;
  const promise = new Promise<boolean>(resolve => {
    resolveFunction = resolve;
  });
  const alert = await this.alertController
      .create({
        header: head, message: msg,
        mode:"ios",
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Continue',
            handler: () => resolveFunction(true)
          }
        ]
      });
  await alert.present();
  return promise;
}


async generalAlert(header: string, message: string) {
  const alert = await this.alertController.create({
    header,
    message,
    mode:"ios",
    buttons: [
      {
        text: 'Okay',
        handler: () => {
        }
      }
    ]
  });
  
  await alert.present();
  }


  async generalToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      position:"middle",
      duration: 4000
    });
    toast.present();
  }

}
