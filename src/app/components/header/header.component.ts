import { catchError, take } from 'rxjs/operators';
import { Component } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { HOME } from './../../consts/routes.const';

@Component({
  selector: 'app-account',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user$: Observable<firebase.User> = this.auth.user$;

  constructor(
    private readonly auth: AuthService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
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
        (response) =>
          response &&
          this.snackBar.open(
            `Oh! You're here. I demand that you feed me, Hooman.`,
            'Close',
            {
              duration: 4000,
            },
          ),
      );
  }

  logout() {
    this.auth
      .logout()
      .pipe(take(1))
      .subscribe((response) => {
        this.router.navigate([`/${HOME}`]);
        this.snackBar.open('Come back soon!', 'Close', {
          duration: 4000,
        });
      });
  }
}