import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockupAdderComponent } from './mockup-adder.component';

describe('MockupAdderComponent', () => {
  let component: MockupAdderComponent;
  let fixture: ComponentFixture<MockupAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockupAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockupAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
