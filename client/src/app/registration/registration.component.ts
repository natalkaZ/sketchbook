import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'app/shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})


export class RegistrationComponent implements OnInit, OnDestroy {
  aSub: Subscription;
  form: FormGroup;

  constructor(private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

/** Валидатор пароля */
private passwordValidator(control: FormControl): ValidationErrors {
  const value = control.value;
  /** Проверка на содержание цифр */
  const hasNumber = /[0-9]/.test(value);
  /** Проверка на содержание заглавных букв */
  const hasCapitalLetter = /[A-Z]/.test(value);
  /** Проверка на содержание прописных букв */
  const hasLowercaseLetter = /[a-z]/.test(value);
  /** Проверка на содержание специальных символов*/
  const hasSpecSymbol = /[^A-Za-z0-9]/.test(value);
  /** Проверка на минимальную длину пароля */
  // const isLengthValid = value ? value.length > 8 : false;
  const emptyInput = value ? value.length === null : null;
  console.log(value);
/** Общая проверка */
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
      name: new FormControl (null, [
        Validators.required,
        Validators.pattern(/^[A-z0-9]*$/),
        Validators.minLength(2)
      ]),
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phone: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^((\\+38-?)|0)?[0-9]{10}$')
      ])),
      avatar: new FormControl(null,[]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        this.passwordValidator
      ]),
      confirmPassword: new FormControl(null, [
      Validators.required
    ])
  })
  }

  onRegister(){
    this.form.disable()

    this.aSub = this.auth.register(this.form.value).subscribe(
      () => this.router.navigate(['/login'], {
        queryParams: {
          registered: true
        }
      }),
      error => {
        console.warn(error)
        this.form.enable()
      }
    )
  }

  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

}