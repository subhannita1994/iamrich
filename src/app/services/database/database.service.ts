import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database'

// json object design in data persistence ---
// [
// 	email:{
// 		accounts:[accountID, …],
// 		incomeCategories:[category strings,…],
// 		expenseCategories:[category strings,…],
// 		defaultCurrency:currency,
// 		budgets : [
// 			{category: string, amount:number, currency:currency, recurrence:const, startDate:DD-MM-YYYY }, ….
// 		]
// 		transactions: [
// 			{type:income/expense, category:string, amount:number, currency:currency, recurrence:const, date:DD-MM-YYYY, description:text, account:accountID }, …
// 		],
// 		transactionsBetweenAccounts: [
// 			{from:accountID, to:accountID, amount:number, currency:currency, recurrence:const, date:DD-MM-YYYY, description:text}, ….
// 		]
// 	},…
// ]
enum Reccurrence {
  once, daily,  weekly,  biWeekly,  monthly, yearly
}
enum TransactionType{
	income, expense
}
class Budget{
	category:string;
	amount:number;
	currency:string;
	recurrence:Reccurrence;
	startDate:Date;
	constructor(category:string, amount:number, currency='CAD', recurrence:Reccurrence=Reccurrence.monthly, startDate:Date=new Date()){
		this.category = category;
		this.amount = amount;
		this.currency = currency;
		this.recurrence = recurrence;
		this.startDate = startDate;
	}
}
class Transaction{
	transactionType:TransactionType;
	category:string;
	amount:number;
	currency:string;
	recurrence:Reccurrence;
	date:Date;
	description:string;
	account:string;
	constructor(transactionType:TransactionType=TransactionType.expense, category:string='miscellaneous', amount:number, currency:string='CAD', recurrence:Reccurrence=Reccurrence.once, date:Date=new Date(), description:string='', account:string='credit'){
		this.transactionType = transactionType;
		this.category = category;
		this.amount = amount;
		this.currency = currency;
		this.recurrence = recurrence;
		this.date = date;
		this.description = description;
		this.account = account;
	}
}
class TransactionsBetweenAccounts{
	fromAccount:string;
	toAccount:string;
	amount:number;
	currency:string;
	recurrence:Reccurrence;
	date:Date;
	description:string;
	constructor(fromAccount:string='chequing', toAccount:string='credit', amount:number, currency:string='CAD', recurrence:Reccurrence=Reccurrence.once, date:Date=new Date(), description:string=''){
		this.fromAccount = fromAccount;
		this.toAccount = toAccount;
		this.amount = amount;
		this.currency = currency;
		this.recurrence = recurrence;
		this.date = date;
		this.description = description;
	}
}

class User{
   email: string;
   accounts :string[];
   incomeCategories :string[];
   expenseCategories :string[];
   defaultCurrency :string;
   budgets:Array<Budget>;
   transactions:Array<Transaction>;
   transactionsBetweenAccounts:Array<TransactionsBetweenAccounts>;

   constructor(email:string){
   		this.email = email;
   		this.accounts = ['chequing', 'savings', 'credit', 'cash'];
   		this.incomeCategories = ['salary', 'investment', 'gift'];
   		this.expenseCategories = ['grocery', 'rent', 'phone', 'internet', 'hydro', 'electricity', 'travel', 'entertainment', 'miscellaneous', 'subscription', 'clothes', 'household', 'personal', 'health'];
   		this.defaultCurrency = 'CAD';
   		this.budgets = [];
   		this.transactions = [];
   		this.transactionsBetweenAccounts = [];
   }
}


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  usersRef: AngularFireList<any>;      
  userRef: AngularFireObject<any>;

  constructor( private db: AngularFireDatabase ) {
  }

  // Create User
  AddUser(email: string, id:string) {
  	// let user = new User(email);
    let user = {'email':email, 'accounts':['chequing', 'savings', 'credit', 'cash'], 
                'incomeCategories':['salary', 'investment', 'gift'],
                'expenseCategories':['grocery', 'rent', 'phone', 'internet', 'hydro', 'electricity', 'travel', 'entertainment', 'miscellaneous', 'subscription', 'clothes', 'household', 'personal', 'health'],
                'defaultCurrency':'CAD',
                'budgets':[],
                'transactions':[],
                'transactionsBetweenAccounts':[]};
  	this.db.database.ref('users/'+id).set(user);
  }

  // Read User
  GetUser(id: string) {
    return this.db.database.ref('users/' + id).once('value').then(function(snapshot){
      return snapshot.val();
    });
  }

  addBudget(id:string, budget:any){
    const promise = this.db.list('users/'+id+'/budgets/').push(budget);
    return promise
      .then(_ => {return true;})
      .catch(err => {return err;});
  }

  addTransaction(id:string, transaction:any){
    const promise = this.db.list('users/'+id+'/transactions/').push(transaction);
    return promise
      .then(_ => {return true;})
      .catch(err => {return err;});
  }

  
  getTransactions(id:string){
    return this.db.list('users/'+id+'/transactions').valueChanges();

  }


  addTransactionBetweenAccounts(id:string, transaction:any){
    const promise = this.db.list('users/'+id+'/transactionsBetweenAccounts/').push(transaction);
    return promise
      .then(_ => {return true;})
      .catch(err => {return err;});
  }
  
}
