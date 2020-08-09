import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqAdderComponent } from './faq-adder.component';

describe('FaqAdderComponent', () => {
  let component: FaqAdderComponent;
  let fixture: ComponentFixture<FaqAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
