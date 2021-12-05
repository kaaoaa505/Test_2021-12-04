import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-project';
  canLogout = false;
  constructor(
    private router: Router,
    private _cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    const authCookieToken = this._cookieService.get('AC_TOKEN');
    console.log('authCookieToken is: ', authCookieToken);
    if(authCookieToken != "" && authCookieToken != null ){
      this.canLogout = true;
    }
  }

  logoutSubmit(){
    this._cookieService.deleteAll();
  }


}
