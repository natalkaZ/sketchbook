import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatModule } from './mat.module/mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { NotesLayoutComponent } from './shared/layouts/notes-layout/notes-layout.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from './shared/classes/token.interceptors';
import { OverviewComponent } from './overview/overview.component';
import { ProfileComponent } from './profile/profile.component';
import { DeleteDialogComponent } from './mat-dialogs/delete-dialog/delete-dialog.component';
import { AddDialogComponent } from './mat-dialogs/add-dialog/add-dialog.component';
// import { LoaderComponent } from './shared/components/loader/loader.component';
import { CompareValidatorDirective } from './shared/classes/compare-validator.directive';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CompareValidatorDirective,
    LoginComponent,
    AuthLayoutComponent,
    NotesLayoutComponent,
    RegistrationComponent,
    HomeComponent,
    OverviewComponent,
    ProfileComponent,
    DeleteDialogComponent,
    AddDialogComponent,
    NotFoundComponent
    // LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  entryComponents: [
    DeleteDialogComponent,
    AddDialogComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
