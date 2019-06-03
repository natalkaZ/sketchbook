import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'app/shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatTooltipDefaultOptions } from '@angular/material';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})


export class RegistrationComponent implements OnInit, OnDestroy {
  @ViewChild('input') inputRef: ElementRef;
  aSub: Subscription;
  form: FormGroup;
  avatar: File;
  imagePreview = '';

  constructor(private auth: AuthService,
              private router: Router,
              public snackBar: MatSnackBar) { }

    // /** Password validator */
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
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ'а-яА-ЯёЁa-zA-Z0-9]*$/),
        Validators.minLength(2)
      ]),
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phone: new FormControl(null, Validators.compose([
        Validators.required,
        // Validators.pattern('^((\\+38-?)|0)?[0-9]{10}$')
        Validators.pattern('^(((\\+38|\\+7)[\-]?)|0)?[0-9]{10}$')
      ])),
      avatar: new FormControl(null, []),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        this.passwordValidator
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required
      ])
    });
  }

  // For compare validator
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  // upload photo
  upload() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.avatar = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);

  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onRegister() {
    this.form.disable();

    this.aSub = this.auth.register(this.form.value).subscribe(
      () => this.router.navigate(['/login'], {
        queryParams: {
          registered: true
        }
      }),
      error => {
        this.openSnackBar(error.error.message, null);
        console.warn(error);
        this.form.enable();
      }
    );
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
