import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockupsListComponent } from './mockups-list.component';

describe('MockupsListComponent', () => {
  let component: MockupsListComponent;
  let fixture: ComponentFixture<MockupsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockupsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
