import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BASE, CREATE, HOME, DASHBOARD, BUDGETS, SETTINGS } from './consts/routes.const';
import { CreateComponent } from './components/create/create.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { SettingsComponent } from './components/settings/settings.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([HOME]);

const routes: Routes = [
  {
    path: BASE,
    redirectTo: `/${DASHBOARD}`,
    pathMatch: 'full',
  },
  {
    path: HOME,
    redirectTo: `/${DASHBOARD}`,
    pathMatch: 'full',
  },
  {
    path: CREATE,
    component: CreateComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: DASHBOARD,
    component: DashboardComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: BUDGETS,
    component: BudgetsComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: SETTINGS,
    component: SettingsComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}