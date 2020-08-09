import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewViewComponent } from './review-view.component';

describe('ReviewViewComponent', () => {
  let component: ReviewViewComponent;
  let fixture: ComponentFixture<ReviewViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
