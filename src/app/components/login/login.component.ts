import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LogicService } from 'src/app/services/logic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;

  

  validationMessages = {
    email: [
        {type: 'required', message: 'Email is required.'},
        {type: 'pattern', message: 'Enter a valid email.'}
    ],
    password: [
        {type: 'required', message: 'Password is required.'},
        {type: 'minlength', message: 'Password must be at least 8 characters long.'}
    ],

};

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private logicService:LogicService , private router:Router) { 

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      password: new FormControl('', [Validators.required, Validators.minLength(8)
        ]
         ),
  });
  }



  submit(){
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      this.loading = false;
      console.log('REs ', res);
      this.authService.setAccessToken(res?.accessToken);
      this.authService.setRefreshToken(res?.refreshToken);
      this.router.navigate(['/dashboard']);

    }, err => {
      this.loading = false;
      this.logicService.generalAlert("Error", err.error.msg);
    });
  }


  ngOnInit() {}

}
