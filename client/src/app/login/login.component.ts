import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from 'app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              public snackBar: MatSnackBar) { }

  /** Password validator */
  private passwordValidator(control: FormControl): ValidationErrors {
    const value = control.value;
    /** Check if string has numbers */
    const hasNumber = /[0-9]/.test(value);
    /** Check if string has uppercase letters */
    const hasCapitalLetter = /[A-Z]/.test(value);
    /** Check if string has lowercase letter */
    const hasLowercaseLetter = /[a-z]/.test(value);
    /** Check if string has special characters */
    const hasSpecSymbol = /[^A-Za-z0-9]/.test(value);
    /** Check if string has a minimal length of 8 characters */
    // const isLengthValid = value ? value.length > 8 : false;
    const emptyInput = value ? value.length === null : null;
    /** General check */
    const passwordValid = hasNumber && hasCapitalLetter && hasLowercaseLetter && hasSpecSymbol;
    // && isLengthValid;

    if (!passwordValid && emptyInput != null) {
      return { invalidPassword: 'Password don\'t valid' };
    }
    if (emptyInput == null) {
      return { invalidPassword: 'Password is required' };
    }
    return null;
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        this.passwordValidator])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this.openSnackBar('Now you can log in using your email and password', null);
      } else if (params['accessDenied']) {
        this.openSnackBar('You must log in first!', null);
      } else if (params['sessionFailed']) {
        this.openSnackBar('Session has expired. Please, log in again.', null);
        this.auth.logOut();
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onSubmit() {
    this.form.disable();

    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        this.openSnackBar(error.error.message, null);
        this.form.enable();
      }
    );
  }

}
