import { LoginModel } from './../models/login.model';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() refresh!: () => void;

  validateForm: FormGroup;

  test: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private _cookieService: CookieService
  ) {
    this.validateForm = new FormGroup({
      title: new FormControl(''),
    });
    this.validateForm
      .get('username')
      ?.statusChanges.subscribe((selectedValue) => {
        console.log('username changed');
        console.log(selectedValue);
      });
    this.validateForm
      .get('password')
      ?.statusChanges.subscribe((selectedValue) => {
        console.log('password changed');
        console.log(selectedValue);
      });

      this.test = this._cookieService.get('AC_TOKEN');
      console.log('result of test is: ', this.test);
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(value: { username: string; password: string }): void {
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }

    let loginModel = new LoginModel();
    loginModel.username = value.username;
    loginModel.password = value.password;

    this.authService.login(loginModel).subscribe((response) => {
      this.authService.showInfo('Logged in success.');
      console.log('response is: ', response);
      this._cookieService.set('AC_TOKEN', response.token);
      this.refresh();
    });

    this.validateForm.reset();
  }
}