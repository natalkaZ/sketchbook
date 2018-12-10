import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from 'app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { ErrorService } from 'app/shared/classes/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription;
  errorMessage: String;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,

              // private errorService: ErrorService
              ) { }

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
    //console.log(emptyInput);
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
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        this.passwordValidator])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if(params['registered']){
        //Now you can enter in system using your personal data

      } else if(params['accessDenied']){
        //You need to be authorizen in system for access this link

      }
    })
  }
  
  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }
  
  // openSnackBar(message: string, action: string) {
  //   this.snackBar.open(message, action, {
  //     duration: 2000,
  //   });
  // }

  onSubmit(){
    this.form.disable()

    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        this.errorMessage = error.error.message
        // this.errorService.snackBar(error.error.message)
        console.log(this.errorMessage)
        this.form.enable()
      }
    )
  }

  // openSnackBar(){
  //   this.errorService.openSnackBar()
  // }

}
