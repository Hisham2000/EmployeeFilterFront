import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authenticationGuard} from "./auth/authentication.guard";

const routes: Routes = [
  {
    'path': 'auth', canActivate: [authenticationGuard], children: [
      {'path': 'login', loadComponent: () => (import('./auth/login/login.component').then(m => m.LoginComponent))},
      {'path': '', 'pathMatch': "full", redirectTo: '/auth/login'}
    ]
  },
  {
    'path': 'employee',
    loadComponent: () => (import('./employee/employee.component').then(m => m.EmployeeComponent)),
    children: [
      {'path': 'home', loadComponent: () => (import('./employee/home/home.component').then(m => m.HomeComponent))},
      {'path': '', 'pathMatch': "full", redirectTo: "/employee/home"}
    ]
  },
  {'path': '', 'pathMatch': "full", redirectTo: "/auth/login"},
  {
    'path': '**',
    'pathMatch': 'full',
    loadComponent: () => (import('./common/error-page/error-page.component').then(m => m.ErrorPageComponent))
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
