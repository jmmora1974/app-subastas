import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin  = ()=> redirectUnauthorizedTo(['/home']);
const redirectLoggedInToProfile  = ()=> redirectLoggedInTo(['/home']);

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'profile',
    loadChildren: () => import('../pages/profile/profile.module').then( m => m.ProfilePageModule),
    ...canActivate(redirectLoggedInToProfile),
    
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
