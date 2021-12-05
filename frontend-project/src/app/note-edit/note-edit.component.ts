import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss']
})
export class NoteEditComponent implements OnInit {

  constructor(
    private router: Router,
    private _cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    const authCookieToken = this._cookieService.get('AC_TOKEN');
    if(authCookieToken == "" || authCookieToken == null ){
      this.router.navigate(['/login'])
      .then(() => {
        console.log('redirect to login.');
        window.location.reload();
      });
    }
  }

}
