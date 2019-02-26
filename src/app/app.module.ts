import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SystemInfoComponent } from './components/system-info/system-info.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { UserComponent } from './components/user/user.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { BaseComponent } from './components/base/base.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';



const routes: Routes = [
  { path:'home', component:HomeComponent },
  { path:'login', component:LoginComponent },
  { path:'register', component:RegisterComponent },
  { path:'user', component:UserComponent,
    children : [
      { path:'list', component:UserListComponent },
      { path:'info/:userid', component:UserInfoComponent },
      { path:'update/:userid', component:UserUpdateComponent },
      { path:'**', redirectTo: 'list' },
    ]
},
  { path:'', component:SystemInfoComponent, pathMatch:'full' },
  { path:'**', redirectTo: ''},
];


@NgModule({
  declarations: [
    AppComponent,
    SystemInfoComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UserListComponent,
    UserInfoComponent,
    UserUpdateComponent,
    UserComponent,
    BaseComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
