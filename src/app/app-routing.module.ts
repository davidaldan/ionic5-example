import { NgModule }             from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService }  from './resolver/data-resolver.service';
import { AuthGuard }            from './guards/auth.guard';
import { AutoLoginGuard }       from './guards/auto-login.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule),
    canLoad: [ AutoLoginGuard ]
  },
  {
    path: 'newpass',
    loadChildren: () => import('./auth/newpass/newpass.module').then( m => m.NewpassPageModule)
  },
  {
    path: 'recover',
    loadChildren: () => import('./auth/recover/recover.module').then( m => m.RecoverPageModule)
  },
  {
    path: 'registre',
    loadChildren: () => import('./auth/registre/registre.module').then( m => m.RegistrePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
