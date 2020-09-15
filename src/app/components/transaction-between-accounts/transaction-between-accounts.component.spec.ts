import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionBetweenAccountsComponent } from './transaction-between-accounts.component';

describe('TransactionBetweenAccountsComponent', () => {
  let component: TransactionBetweenAccountsComponent;
  let fixture: ComponentFixture<TransactionBetweenAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionBetweenAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionBetweenAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
