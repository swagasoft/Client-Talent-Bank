import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './auth/auth.guard';
import { ComponentPageComponent } from './pages/component-page/component-page.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'example',
    loadChildren: () => import('./pages/example/example.module').then( m => m.ExamplePageModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent, canActivate:[AuthGuard]
  },
  {
    path: 'admin-dashboard',
    component: AdminComponent, canActivate:[AuthGuard]
  },

  {
    path: 'sign-up', component: SignUpComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
