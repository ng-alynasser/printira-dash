import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NbAuthComponent } from './auth.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          returnUrl: window.location.pathname,
        },
      },
      // {
      //   path: 'request-password',
      //   component: RequestPasswordComponent,
      // },
      // {
      //   path: 'reset-password/:token',
      //   component: ResetPasswordComponent ,
      // },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AuthRoutingModule { }
