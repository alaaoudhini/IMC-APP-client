import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AdminUsersComponent } from './admin/users/users.component';
import { ActivitiesComponent } from './admin/activities/activities.component';
import { RegimesComponent } from './admin/regimes/regimes.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CalculImcComponent } from './imc/calcul-imc/calcul-imc.component';
import { MenuComponent } from './menu/menu.component';
import { RegimebyIMCComponent } from './imc/regimeby-imc/regimeby-imc.component';
import { UserService } from './services/user.service';
import { ActivitybyImcComponent } from './imc/activityby-imc/activityby-imc.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AdminUsersComponent,
    ActivitiesComponent,
    RegimesComponent,
    NavbarComponent,
    CalculImcComponent,
    MenuComponent,
    RegimebyIMCComponent,
    ActivitybyImcComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule, 
    AppRoutingModule,
    BrowserAnimationsModule
    
  ],
  providers: [UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
