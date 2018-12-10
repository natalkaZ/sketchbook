import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { LoginComponent } from 'app/login/login.component';

@Injectable({
    providedIn: 'root'
  })

export class ErrorService{
    constructor(public snackBar: MatSnackBar,
                private login: LoginComponent) {}

    // static snackBar(message: string){
        
    // }
    openSnackBar() {
    this.snackBar.openFromComponent(LoginComponent, {
        data: this.login.errorMessage
      });
    console.log('snackBar working')
    }
  }