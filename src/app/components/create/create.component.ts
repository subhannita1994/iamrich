import { Component , Input, ViewChild, AfterViewInit} from '@angular/core';
import { DatePipe } from '@angular/common';
import {FormsModule, ReactiveFormsModule, NgForm, FormControl, Validators} from '@angular/forms';
import {  CookieService  } from 'ngx-cookie-service';
import { DatabaseService } from '../../services/database/database.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {EditTransactionComponent} from '../edit-transaction/edit-transaction.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CreateComponent implements AfterViewInit{
  amount;  selectedCurrency;  currency;  selectedType;  type;  categories=[];  category; recurrence;
  selectedReccurence;  selectedDate;  date;  accounts=[];  selectedAccount; account; description;
  @Input() transactions: MatTableDataSource<any>;   @Input() transactions_count; 
  @ViewChild(MatPaginator) paginator: MatPaginator; @ViewChild(MatSort) sort: MatSort;
  columnsToDisplay = ['date', 'type', 'amount', 'category', 'action'];

  constructor(private snackBar:MatSnackBar,
              private readonly database: DatabaseService, 
              private cookieService: CookieService,
              private datepipe: DatePipe,
              private dialog: MatDialog) { 
    this.selectedType='expense';
    this.type = new FormControl(this.selectedType, [Validators.required]);
    this.amount = new FormControl('', [Validators.required]);
    this.selectedCurrency = this.cookieService.get('defaultCurrency');
    this.currency = new FormControl(this.selectedCurrency, [Validators.required]);
    this.categories = JSON.parse(this.cookieService.get('expenseCategories'));
    this.category = new FormControl('', [Validators.required]);
    this.selectedReccurence = 'Once';
    this.recurrence = new FormControl(this.selectedReccurence, [Validators.required]);
    this.selectedDate = new Date();
    this.date = new FormControl(this.selectedDate, [Validators.required]);
    this.accounts = JSON.parse(this.cookieService.get('accounts'));
    this.selectedAccount = 'credit';
    this.account = new FormControl(this.selectedAccount, [Validators.required]);
    this.description = new FormControl('', []);
    this.database.getTransactions(this.cookieService.get('id')).subscribe(
        res=> { 
          var temp = new Array();
          res.forEach( item => {
            temp.push({'transactionID': item.key, 'type':item.payload.val()['type'], 'amount':item.payload.val()['amount'], 'currency':item.payload.val()['currency'], 'category':item.payload.val()['category'],
          'recurrence':item.payload.val()['recurrence'], 'date':item.payload.val()['date'], 'account':item.payload.val()['account'], 'description':item.payload.val()['description']});
            
          });
          this.transactions = new MatTableDataSource(temp); 
          this.transactions.paginator = this.paginator;
          this.transactions.sort = this.sort;
          this.transactions_count = temp.length; });
  }

  ngAfterViewInit() {
    
  }


applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.transactions.filter = filterValue.trim().toLowerCase();
    if (this.transactions.paginator) {
      this.transactions.paginator.firstPage();
    }
  }

  editRow(obj) {
    const dialogRef = this.dialog.open(EditTransactionComponent, {
      width: '80%',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Edit'){
        var response = this.database.updateTransaction(this.cookieService.get('id'), obj.transactionID, result.data);
        if(response)
           this.snackBar.open('Success!', 'Close',{duration: 4000});
         else
           this.snackBar.open('Sorry! Try again!', 'Close', {duration: 4000});
      }
    });
  }


  deleteRow(obj){
    console.log(obj);
  }

  changeCategories(type:string){
    if(type=='expense')
      this.categories = JSON.parse(this.cookieService.get('expenseCategories'));
    else if(type=='income')
      this.categories = JSON.parse(this.cookieService.get('incomeCategories'));
  }

addTransaction(form: NgForm) {
    if(this.getErrorMessage()=='')
    {
      var response = this.database.addTransaction(this.cookieService.get('id'), {'type':this.type.value, 'amount':this.amount.value, 'currency':this.currency.value, 'category':this.category.value,
          'recurrence':this.recurrence.value, 'date':this.datepipe.transform(this.date.value, 'dd-MM-yyyy'), 'account':this.account.value, 'description':this.description.value});
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
        || this.date.hasError('required')
        || this.account.hasError('required')) ? 'You must enter a value' :'';
  }
}