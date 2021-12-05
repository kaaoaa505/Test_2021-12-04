import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginModel } from './models/login.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders();

  private resourceUrl = environment.backend_api + '/users/login';

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.headers.set('Access-Control-Allow-Origin', '*');
  }

  private convert(todo: LoginModel): LoginModel {
    const copy: LoginModel = Object.assign({}, todo);
    return copy;
  }

  showInfo(str: string) {
    this.toastr.info(str);
  }

  showError(str: string) {
    this.toastr.error(str);
  }

  login(loginModel: LoginModel): Observable<any> {
    const body = this.convert(loginModel);
    return this.http.post<any>(this.resourceUrl, body);
  }


}
