import { catchError, take } from 'rxjs/operators';
import { Component } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {  CookieService  } from 'ngx-cookie-service';

import { AuthService } from '../../services/auth/auth.service';
import { DatabaseService } from '../../services/database/database.service';
import { BASE, DASHBOARD } from './../../consts/routes.const';

@Component({
  selector: 'app-account',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user$: Observable<firebase.User> = this.auth.user$;

  constructor(
    private readonly auth: AuthService,
    private readonly database: DatabaseService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private cookieService: CookieService
  ) {}

  login() {
    this.auth
      .loginViaGoogle()
      .pipe(
        take(1),
        catchError((error) => {
        	console.log(`${error.message}`);
          return EMPTY;
        }),
      )
      .subscribe(
        (response) =>{

          this.database.AddUser(response.additionalUserInfo.profile['email'], response.additionalUserInfo.profile['id']);
          this.cookieService.set('email', response.additionalUserInfo.profile['email']);
          this.cookieService.set('id', response.additionalUserInfo.profile['id']); 
          this.router.navigate([`/${DASHBOARD}`]);
          this.snackBar.open(
            'Welcome!', 'Close',{duration: 4000,},
          );
        });
  }

  logout() {
    this.auth
      .logout()
      .pipe(take(1))
      .subscribe((response) => {
        this.cookieService.deleteAll();
        this.router.navigate([`/${BASE}`]);
        this.snackBar.open('Come back soon!', 'Close', {
          duration: 4000,
        });
      });
  }
}