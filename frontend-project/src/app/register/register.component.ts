import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RegisterModel } from '../models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup;

  constructor(
    private router: Router,
    private _cookieService: CookieService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.validateForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      image: new FormControl(''),
    });

    this.validateForm
      .get('username')
      ?.statusChanges.subscribe((selectedValue) => {
        console.log('username changed');
        console.log(selectedValue);
      });

    this.validateForm.get('email')?.statusChanges.subscribe((selectedValue) => {
      console.log('email changed');
      console.log(selectedValue);
    });

    this.validateForm
      .get('password')
      ?.statusChanges.subscribe((selectedValue) => {
        console.log('password changed');
        console.log(selectedValue);
      });

    this.validateForm.get('image')?.statusChanges.subscribe((selectedValue) => {
      console.log('image changed');
      console.log(selectedValue);
    });
  }

  ngOnInit(): void {
    const authCookieToken = this._cookieService.get('AC_TOKEN');
    if (authCookieToken != '' && authCookieToken != null) {
      this.router.navigate(['/notes']).then(() => {
        console.log('redirect to notes.');
        window.location.reload();
      });
    }

    this.validateForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      image: [null, [Validators.required]],
    });
  }

  
  submitForm(value: { username: string; password: string }): void {
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }

    let registerModel = new RegisterModel();
    registerModel.username = value.username;
    registerModel.password = value.password;

    this.authService.register(registerModel).subscribe((response) => {
      this.authService.showInfo('Registered successfully.');
      console.log('response is: ', response);
      this._cookieService.set('AC_TOKEN', response.token);
      this.router.navigate(['/notes'])
      .then(() => {
        console.log('redirect to notes.');
        window.location.reload();
      });
    });

    this.validateForm.reset();
  }

}
