import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwtDecode, * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }


  signUp(user: any) {
    return this.http.post(environment.apiBaseUrl + '/create-user' , user);
  }


  login( user: any) {
    return this.http.post(environment.apiBaseUrl + '/login' , user);
  }


  getBalance() {
    return this.http.get(environment.apiBaseUrl + '/get-user-balance');
  }

  processTransaction(data: any){
    return this.http.put(environment.apiBaseUrl + '/perform-transaction', data);
  }

  getAllUsers(){
    return this.http.get(environment.apiBaseUrl + '/get-all-users');
  }

  getEmail(){
    try {
      const payLoad: any = jwtDecode(this.getAccessToken());
      const email = payLoad['email'];
      return email;
    } catch (error) {

    }

   }

   getPersonName(){
    try {
      const payLoad = this.getUserPayload();
        return payLoad;
    } catch (error) {
      console.log('ERr', error);

    }
    

   }

   getRole(): string{
    try {
     const payLoad: any = this.getUserPayload();
     const role = payLoad['role'];
     return role;
    } catch (error) {
      return '';
    }
    }

    isLogedIn() {
      const userPayload = this.getUserPayload();
      console.log('SEE ', userPayload);
      if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
      } else {
      return false;
      }
    }


    getUserPayload() {
      const token = this.getAccessToken();
      if (token) {
        const userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
      } else {
        return null;
      }
    }

    public logout(): void {
      this.deleteToken();
      this.router.navigateByUrl('/login');
     }


     deleteToken() {
       window.localStorage.removeItem('accessToken');
     }




     setAccessToken(token: string) {
      sessionStorage.setItem('accessToken', token);
     }

     public getAccessToken(): any {
      return sessionStorage.getItem('accessToken');
      
      }


    setRefreshToken(token: string) {
      localStorage.setItem('refreshToken', token);
     }

    getRefreshToken(): any {
      return localStorage.getItem('refreshToken');
     }


     deleteAccessToken() {
       window.sessionStorage.removeItem('token')
     }



}
