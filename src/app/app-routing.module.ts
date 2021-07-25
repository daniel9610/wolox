import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component'
import { RegisterComponent } from '../app/register/register.component'
import { LoginComponent } from '../app/login/login.component'

const routes: Routes = [
  // { path: '', redirectTo: '/landing', pathMatch: 'full' },

  {
    path: '',
    component: LandingComponent,
    children: [
     {
       path: 'landing',
       loadChildren: './landing/landing.module#LandingModule'
     }
    ]
  },

  {
    path: 'register',
    component: RegisterComponent,
    children: [
     {
       path: 'register',
       loadChildren: './modules/register/register.module#RegisterModule'
     }
    ]
  },


  {
    path: 'login',
    component: LoginComponent,
    children: [
     {
       path: 'login',
       loadChildren: './modules/login/login.module#LoginModule'
     }
    ]
  },

  {  path: '**', redirectTo: 'landing' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
