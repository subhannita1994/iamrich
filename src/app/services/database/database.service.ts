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


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

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
    return this.db.list('users/'+id+'/transactions/').snapshotChanges();

  }

  updateTransaction(id:string, transactionID:string, transaction:any){
    const promise = this.db.database.ref('users/'+id+'/transactions/'+transactionID).set(transaction);
    return promise
      .then(_ => {return true;})
      .catch(err => {return err;});
  }

  addTransactionBetweenAccounts(id:string, transaction:any){
    const promise = this.db.list('users/'+id+'/transactionsBetweenAccounts/').push(transaction);
    return promise
      .then(_ => {return true;})
      .catch(err => {return err;});
  }
  
}
