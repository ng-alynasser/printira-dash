import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockupsComponent } from './mockups.component';

describe('MockupsComponent', () => {
  let component: MockupsComponent;
  let fixture: ComponentFixture<MockupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
