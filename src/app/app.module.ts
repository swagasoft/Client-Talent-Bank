import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentPageComponent } from './pages/component-page/component-page.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthInterceptor } from './auth/auth.intercepto';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [AppComponent, ComponentPageComponent, LoginComponent, DashboardComponent,
  AdminComponent, SignUpComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy
  },   {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
