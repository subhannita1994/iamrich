import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material-module/app-material.module';
import { AppFirebaseModule } from './app-firebase/app-firebase.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {  CookieService  } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { CreateComponent } from './components/create/create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BaseComponent } from './components/base/base.component';
import { TransactionBetweenAccountsComponent } from './components/transaction-between-accounts/transaction-between-accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileCardComponent,
    CreateComponent,
    DashboardComponent,
    BudgetsComponent,
    SettingsComponent,
    BaseComponent,
    TransactionBetweenAccountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppFirebaseModule,
    FormsModule, ReactiveFormsModule

  ],
  providers: [
    CookieService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
