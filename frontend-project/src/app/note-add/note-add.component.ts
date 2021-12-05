import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Note } from '../models/note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.scss'],
})
export class NoteAddComponent implements OnInit {
  @Input() refresh!: () => void;

  validateForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    categoryId: new FormControl('')
  });
  
  categories = [
    {id: 1, name: 'Phones'},
    {id: 2, name: 'TODO'},
    {id: 3, name: 'Wish List'}
  ];

  constructor(
    private router: Router,
    private _cookieService: CookieService,
    private noteService: NoteService
  ) {
  }

  ngOnInit(): void {
    const authCookieToken = this._cookieService.get('AC_TOKEN');
    if (authCookieToken == '' || authCookieToken == null) {
      this.router.navigate(['/login']).then(() => {
        console.log('redirect to login.');
        window.location.reload();
      });
    }
    
    this.validateForm
      .get('title')
      ?.statusChanges.subscribe((selectedValue) => {
        console.log('title changed');
        console.log(selectedValue);
      });

    this.validateForm
      .get('categoryId')
      ?.statusChanges.subscribe((selectedValue) => {
        console.log('category changed');
        console.log(selectedValue);
      });
  }

  submitForm(value: { title: string; categoryId: number }): void {
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }

    this.noteService.create(value).subscribe(() => {
      this.noteService.showInfo('Note Created.');
      this.router.navigate(['/notes'])
      .then(() => {
        console.log('redirect to notes.');
        window.location.reload();
      });
    });

    this.validateForm.reset();
  }

}
