import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';


export interface User{
  email: string,
  role: string,
  balance: number
  name: string
}



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
usersList : Array<User> = [];
  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.authService.getAllUsers().subscribe((list: any) => {
        console.log('ls ', list);
        this.usersList = list;
    },);
  }


}
