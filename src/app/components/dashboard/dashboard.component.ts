import { AlertController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { LogicService } from 'src/app/services/logic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
person: any;
balance = 0;
userRole = '';

  constructor(private authService: AuthService, private alertController: AlertController,
    private logicService: LogicService) { 
    this.person = {};
  }

  ngOnInit() {
    this.person =  this.authService.getUserPayload();
    this.authService.getBalance().subscribe((res: any) => {
      this.balance = res?.balance;
    }, err => {
      console.log('err', err);
    });

    this.userRole = this.authService.getRole();
    console.log("CGGGg",  this.userRole);
  }


  async performTransFer() {
    const alert = await this.alertController.create({
      header: 'Transfer !',
      mode:"ios",
      message: 'Message <strong>text</strong>!!!',
      inputs:[{name:"amount",type:"number", placeholder:"enter amount"},{name:"email",
       type:"email", placeholder:"enter email"}],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Continue',
          handler: (data) => {
            console.log('Confirm Okay', data);
            if(data?.amount > this.balance ){
              this.logicService.generalToast('invalid balance!');
            }else{
                const transData = {amount: data.amount, email: data?.email}
              this.authService.processTransaction(transData).subscribe((response: any) => {
                console.log('ress', response);
                this.logicService.generalAlert("Success", response?.msg);
                this.balance = response?.newBalance;
              }, err => {
                console.log(err);
                this.logicService.generalAlert('Failed', err.error.msg)
              });

            }
         

          }
        }
      ]
    });
  
    await alert.present();
  }


  logout(){
    this.authService.logout();
  }

}
