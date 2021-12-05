import { NoteService } from './../note.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Note } from '../models/note';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {
  notes$!: Observable<Note[]>;

  categories = [
    {id: 1, name: 'Phones'},
    {id: 2, name: 'TODO'},
    {id: 3, name: 'Wish List'}
  ];

  constructor(
    private router: Router,
    private _cookieService: CookieService,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    const authCookieToken = this._cookieService.get('AC_TOKEN');
    if (authCookieToken == '' || authCookieToken == null) {
      this.router.navigate(['/login']).then(() => {
        console.log('redirect to login.');
        window.location.reload();
      });
    } else {
      this.loadAll();
    }
  }

  loadAll = () => {
    this.notes$ = this.noteService.getNotes();
  };

  getCategoryById(note: Note){
    for (let i = 0; i < this.categories.length; i++) {
      if(this.categories[i].id == note.categoryId){
        return this.categories[i].name;
      }
    }
    return 'No category specified.';
  }

  deleteNote(note: Note) {
    var answer = window.confirm('Are you sure?');
    if (answer) {
      this.noteService.delete(note.id).subscribe(() => {
        this.loadAll();
        this.noteService.showInfo('Deleted successfully.');
      });
    } else {
      this.noteService.showInfo('Delete canceled.');
    }
  }
}
