import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsAdderComponent } from './vendors-adder.component';

describe('VendorsAdderComponent', () => {
  let component: VendorsAdderComponent;
  let fixture: ComponentFixture<VendorsAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorsAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorsAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
