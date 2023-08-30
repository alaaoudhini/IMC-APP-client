import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminUsersComponent } from './admin/users/users.component';
import { ActivitiesComponent } from './admin/activities/activities.component';
import { RegimesComponent } from './admin/regimes/regimes.component';
import { CalculImcComponent } from './imc/calcul-imc/calcul-imc.component';
import { RegimebyIMCComponent } from './imc/regimeby-imc/regimeby-imc.component';
import { ActivitybyImcComponent } from './imc/activityby-imc/activityby-imc.component';



const routes: Routes = [
  { path: '', component: LoginComponent , title : 'Login'},
  { path: 'register', component: RegisterComponent , title : 'Register'},
  { path: 'admin/users', component: AdminUsersComponent , title : 'Admin panel users'},
  { path: 'admin/activities', component: ActivitiesComponent , title : 'Admin panel activities'},
  { path: 'admin/regimes', component: RegimesComponent , title : 'Admin panel regimes'},
  { path: 'imc/calcul-IMC', component: CalculImcComponent , title : 'Calul IMC'},
  { path: 'imc/regimebyIMC', component: RegimebyIMCComponent , title : 'Regime By Imc'},
  { path: 'imc/activitybyIMC', component: ActivitybyImcComponent , title : 'Activity By Imc'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
