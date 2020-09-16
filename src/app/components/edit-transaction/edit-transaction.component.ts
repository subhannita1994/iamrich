import { Component, Inject, Optional, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule, NgForm, FormControl, Validators} from '@angular/forms';
import {  CookieService  } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {

amount;  selectedCurrency;  currency;  selectedType;  type;  categories=[];  category; selectedCategory;
recurrence; selectedReccurence;  selectedDate;  date;  accounts=[];  selectedAccount; account; selectedDescription; description;

  constructor(private cookieService: CookieService,
  			  private dialogRef: MatDialogRef<EditTransactionComponent>,
  			  private datepipe: DatePipe,
    		  @Inject(MAT_DIALOG_DATA) private data: any) {
  		
  		this.amount = new FormControl(data['amount'], [Validators.required]);
  		this.selectedCurrency = data['currency'];
  		this.currency = new FormControl(this.selectedCurrency, [Validators.required]);
  		this.selectedType = data['type'];
  		this.type = new FormControl(this.selectedType, [Validators.required]);
  		if(this.selectedType == 'expense')
  			this.categories = JSON.parse(this.cookieService.get('expenseCategories'));
  		else
  			this.categories = JSON.parse(this.cookieService.get('incomeCategories'));
  		this.selectedCategory = data['category'];
  		this.category = new FormControl(this.selectedCategory, [Validators.required]);
  		this.selectedReccurence = data['recurrence'];
  		this.recurrence = new FormControl(this.selectedReccurence, [Validators.required]);
  		var parts = data['date'].split('-');
  		this.selectedDate = new Date(parts[2], parts[1] - 1, parts[0]);
  		this.date = new FormControl(this.selectedDate, [Validators.required]);
  		this.accounts = JSON.parse(this.cookieService.get('accounts'));
  		this.selectedAccount = data['account'];
  		this.account = new FormControl(this.selectedAccount, [Validators.required]);
  		this.selectedDescription = data['description'];
  		this.description = new FormControl(this.selectedDescription, [Validators.required]);
  }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  edit(form: NgForm){
  	if(this.getErrorMessage()==''){
  		this.dialogRef.close({event:'Edit',data:{'type':this.type.value, 'amount':this.amount.value, 'currency':this.currency.value, 'category':this.category.value,
          'recurrence':this.recurrence.value, 'date':this.datepipe.transform(this.date.value, 'dd-MM-yyyy'), 'account':this.account.value, 'description':this.description.value}});
  	}
  }

  changeCategories(type:string){
    if(type=='expense')
      this.categories = JSON.parse(this.cookieService.get('expenseCategories'));
    else if(type=='income')
      this.categories = JSON.parse(this.cookieService.get('incomeCategories'));
  }

  getErrorMessage() {
    return (this.amount.hasError('required') 
        || this.currency.hasError('required') 
        || this.category.hasError('required') 
        || this.recurrence.hasError('required') 
        || this.date.hasError('required')
        || this.account.hasError('required')) ? 'You must enter a value' :'';
  }

}
