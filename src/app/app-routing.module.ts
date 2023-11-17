import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authenticationGuard} from "./auth/authentication.guard";
import {employeeGuard} from "./employee/employee.guard";

const routes: Routes = [
  {
    'path': 'auth', canActivate: [authenticationGuard], children: [
      {'path': 'login', loadComponent: () => (import('./auth/login/login.component').then(m => m.LoginComponent))},
      {'path': 'reset-password', loadComponent: () => (import('./auth/reset-password/reset-password.component').then(m=>m.ResetPasswordComponent))},
      {'path': '', 'pathMatch': "full", redirectTo: '/auth/login'}
    ]
  },
  {
    'path': 'employee',
    canActivate: [employeeGuard],
    loadComponent: () => (import('./employee/employee.component').then(m => m.EmployeeComponent)),
    children: [
      {'path': 'home', loadComponent: () => (import('./employee/home/home.component').then(m => m.HomeComponent))},
      {'path': 'add', loadComponent: () => (import('./employee/add-employee/add-employee.component').then(m=>m.AddEmployeeComponent))},
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
