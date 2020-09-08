import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BASE, CREATE, HOME } from './consts/routes.const';
import { CreateComponent } from './components/create/create.component';
import { AppComponent } from './app.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([HOME]);

const routes: Routes = [
  {
    path: BASE,
    redirectTo: `/${HOME}`,
    pathMatch: 'full',
  },
  {
    path: HOME,
    component: AppComponent,
  },
  {
    path: CREATE,
    component: CreateComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}