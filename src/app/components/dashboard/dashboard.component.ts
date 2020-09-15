import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import {  CookieService  } from 'ngx-cookie-service';

@Component({
  selector: 'app-main',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent implements OnInit {

  constructor(private readonly database: DatabaseService, private cookieService: CookieService) { 
	}

  ngOnInit(): void {

  	this.database.GetUser(this.cookieService.get('id')).then((user)=>{
  		this.cookieService.set('defaultCurrency', user.defaultCurrency);
  		this.cookieService.set('incomeCategories', JSON.stringify(user.incomeCategories));
  		this.cookieService.set('expenseCategories', JSON.stringify(user.expenseCategories));
  		this.cookieService.set('accounts', JSON.stringify(user.accounts));
  		//TODO: make dashboard-- user now contains all information
  	});
  }

}
