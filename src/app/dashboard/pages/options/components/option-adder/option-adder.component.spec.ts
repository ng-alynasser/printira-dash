import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionAdderComponent } from './option-adder.component';

describe('OptionAdderComponent', () => {
  let component: OptionAdderComponent;
  let fixture: ComponentFixture<OptionAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
