import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  headers = new HttpHeaders();

  private resourceUrl = environment.backend_api + '/users/login';

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.headers.set('Access-Control-Allow-Origin', '*');
  }

  getTodos(): Observable<any> {
    return this.http.get<any>(this.resourceUrl);
  }
}
