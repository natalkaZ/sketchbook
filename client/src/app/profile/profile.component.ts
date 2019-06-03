import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'app/shared/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { User } from 'app/shared/services/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('input') inputRef: ElementRef;
  aSub: Subscription; // need or not??
  form: FormGroup;
  user: User;
  _id: string;

  avatarSrc: any;
  image: any;
  avatar: File;
  imagePreview = '';

  constructor(private auth: AuthService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.auth.profile().subscribe();
    this.user = this.auth.getUserDetails();

    console.log(this.user);

    this.form = new FormGroup({
      name: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern(/^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ'а-яА-ЯёЁa-zA-Z0-9]*$/),
        Validators.minLength(2)
      ])),
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phone: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^((38-?)|0)?[0-9]{10}$')
      ])),
      image: new FormControl(this.imagePreview ? this.imagePreview : null, [])
    });
    this.imagePreview = this.image;
    this.form.controls['email'].disable();

    if (this.user) {
      this.form.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone
      });

      this.imagePreview = this.user.avatarSrc;
    }

  }

  // upload photo
  upload() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    console.log('onFileUpload works!!!');
    const file = event.target.files[0];
    this.avatar = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
      console.log('after onFileUpload this.imagePreview is: ' + this.imagePreview);
    };

    reader.readAsDataURL(file);
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  editProfile(user: User) {
    this.user = user;
    this.user = this.auth.getUserDetails();
  }

  onSubmit() {
    let obs$;
    this.form.disable();
    obs$ = this.auth.updateUserProfile(this._id, this.form.value.name, this.form.value.phone, this.avatar);
    console.log('obs$ works!!!');
    obs$.subscribe(
      user => {
        this.user = user;
        this.openSnackBar('Changes saved!!!', 'OK');
        this.form.enable();
      },
      error => {
        this.openSnackBar(error.error.message, 'OK');
        this.form.enable();
      }
    );
  }

  canselEdit(user: User) {
    this.user = user;
    this.user = this.auth.getUserDetails();

    if (this.user) {
      this.form.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone
      });

      this.imagePreview = this.user.avatarSrc;
    }
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
