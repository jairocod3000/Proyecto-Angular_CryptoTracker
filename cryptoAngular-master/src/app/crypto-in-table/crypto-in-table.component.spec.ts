import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoInTableComponent } from './crypto-in-table.component';

describe('CryptoInTableComponent', () => {
  let component: CryptoInTableComponent;
  let fixture: ComponentFixture<CryptoInTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoInTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoInTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
