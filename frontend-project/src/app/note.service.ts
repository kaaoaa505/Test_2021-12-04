import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from './models/note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  headers = new HttpHeaders();
  description = 'just for test';
  userId = 1;

  private resourceUrl = environment.backend_api + '/notes';

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.headers.set('Access-Control-Allow-Origin', '*');
  }

  private convert(note: Note): Note {
    const copy: Note = Object.assign({}, note);
    return copy;
  }

  showInfo(str: string) {
    this.toastr.info(str);
  }

  showError(str: string) {
    this.toastr.error(str);
  }

  create(note: Note): Observable<Note> {
    note.description = this.description;
    note.userId = this.userId;
    const body = this.convert(note);
    return this.http.post<Note>(this.resourceUrl, body);
  }

  getNotes(): Observable<any> {
    return this.http.get<any>(this.resourceUrl);
  }

  delete(id: number | undefined): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${this.resourceUrl}/${id}`);
  }
}
