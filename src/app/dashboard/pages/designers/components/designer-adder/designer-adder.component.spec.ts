import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerAdderComponent } from './designer-adder.component';

describe('DesignerAdderComponent', () => {
  let component: DesignerAdderComponent;
  let fixture: ComponentFixture<DesignerAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignerAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignerAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
