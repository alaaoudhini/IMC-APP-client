import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminUsersComponent } from './admin/users/users.component';
import { ActivitiesComponent } from './admin/activities/activities.component';
import { Title } from '@angular/platform-browser';
import { RegimesComponent } from './admin/regimes/regimes.component';


const routes: Routes = [
  { path: '', component: LoginComponent , title : 'Login'},
  { path: 'register', component: RegisterComponent , title : 'Register'},
  { path: 'admin/users', component: AdminUsersComponent , title : 'Admin panel users'},
  { path: 'admin/activities', component: ActivitiesComponent , title : 'Admin panel activities'},
  { path: 'admin/regimes', component: RegimesComponent , title : 'Admin panel regimes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
