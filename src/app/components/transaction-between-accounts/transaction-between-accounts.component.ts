import { Component, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule, NgForm, FormControl, Validators} from '@angular/forms';
import {  CookieService  } from 'ngx-cookie-service';
import { DatabaseService } from '../../services/database/database.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-transaction-between-accounts',
  templateUrl: './transaction-between-accounts.component.html',
  styleUrls: ['./transaction-between-accounts.component.css']
})
export class TransactionBetweenAccountsComponent{

accounts=[];  selectedFromAccount;  selectedToAccount;  fromAccount;  toAccount;  amount;  selectedCurrency;  
currency;  selectedReccurence;  recurrence;  selectedDate;  date;  description;


  constructor(private snackBar:MatSnackBar,
              private readonly database: DatabaseService, 
              private cookieService: CookieService) { 
    this.accounts = JSON.parse(this.cookieService.get('accounts'));
    this.selectedFromAccount = 'chequing';
    this.selectedToAccount = 'credit';
    this.fromAccount = new FormControl(this.selectedFromAccount, [Validators.required]);
    this.toAccount = new FormControl(this.selectedToAccount, [Validators.required]);
    this.amount = new FormControl('', [Validators.required]);
    this.selectedCurrency = this.cookieService.get('defaultCurrency');
    this.currency = new FormControl(this.selectedCurrency, [Validators.required]);
    this.selectedReccurence = 'Once';
    this.recurrence = new FormControl(this.selectedReccurence, [Validators.required]);
    this.selectedDate = new Date();
    this.date = new FormControl(this.selectedDate, [Validators.required]);
    this.description = new FormControl('', []);

  }


addTransaction(form: NgForm) {
    if(this.getErrorMessage()=='')
    {
        var response = this.database.addTransactionBetweenAccounts(this.cookieService.get('id'), {'fromAccount':this.fromAccount.value, 'toAccount':this.toAccount.value, 'amount':this.amount.value, 'currency':this.currency.value,
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
        || this.fromAccount.hasError('required') 
        || this.toAccount.hasError('required') 
        || this.recurrence.hasError('required') 
        || this.date.hasError('required')) ? 'You must enter a value' :'';
  }
}
