import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component'
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { NotesLayoutComponent } from './shared/layouts/notes-layout/notes-layout.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/classes/auth.guard';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo:'/home', pathMatch:'full'},
      {path: 'home', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent}
    ]
  },
  {
    path: '', component: NotesLayoutComponent, 
    canActivate: [AuthGuard],
    children: [
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
