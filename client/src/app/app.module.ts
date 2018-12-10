import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatModule } from './mat.module/mat.module';
import { LoginComponent } from './login/login.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { NotesLayoutComponent } from './shared/layouts/notes-layout/notes-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from './shared/classes/token.interceptors';
import { ErrorService } from './shared/classes/error.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthLayoutComponent,
    NotesLayoutComponent,
    RegistrationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
