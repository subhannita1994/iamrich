import { Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule, NgForm, FormControl, Validators} from '@angular/forms';
import {  CookieService  } from 'ngx-cookie-service';
import { DatabaseService } from '../../services/database/database.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent  implements OnInit{

  selectedDate;  selectedCurrency;  selectedReccurence;  categories=[];  amount;
  currency;  category;  recurrence;  date;  description;
  

  constructor(private readonly snackBar: MatSnackBar,
              private readonly database: DatabaseService, 
              private cookieService: CookieService) { 
    this.amount = new FormControl('', [Validators.required]);
    this.selectedCurrency = this.cookieService.get('defaultCurrency');
    this.currency = new FormControl(this.selectedCurrency, [Validators.required]);
    this.categories = JSON.parse(this.cookieService.get('expenseCategories'));
    this.category = new FormControl('', [Validators.required]);
    this.selectedReccurence = 'Monthly';
    this.recurrence = new FormControl(this.selectedReccurence, [Validators.required]);
    this.selectedDate = new Date();
    this.date = new FormControl(this.selectedDate, [Validators.required]);
    this.description = new FormControl('', []);

  }

   ngOnInit() {
      
    }

   addBudget(form: NgForm) {
     if(this.getErrorMessage()=='')
    {
      var response = this.database.addBudget(this.cookieService.get('id'), 
        {'amount':this.amount.value, 'currency':this.currency.value, 'category':this.category.value,
          'recurrence':this.recurrence.value, 'date':this.date.value, 'description':this.description.value});
       if(response)
         this.snackBar.open('Success!', 'Close',{duration: 4000});
       else
         this.snackBar.open('Sorry! Try again!', 'Close', {duration: 4000});
     }
   }

  getErrorMessage() {
    return (this.amount.hasError('required') 
        || this.currency.hasError('required') 
        || this.category.hasError('required') 
        || this.recurrence.hasError('required') 
        || this.date.hasError('required')) ? 'You must enter a value' :'';
  }

}
