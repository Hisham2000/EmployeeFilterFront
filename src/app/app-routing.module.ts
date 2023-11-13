import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    'path': 'auth', children: [
      {'path': 'login', loadComponent: () => (import('./auth/login/login.component').then(m=>m.LoginComponent))},
      {'path': '', 'pathMatch': "full", redirectTo: '/auth/login'}
    ]
  },
  {'path': '', 'pathMatch': "full", redirectTo: "/auth/login"},
  {'path': '**', 'pathMatch': 'full', loadComponent: () => (import('./common/error-page/error-page.component').then(m=>m.ErrorPageComponent))}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
