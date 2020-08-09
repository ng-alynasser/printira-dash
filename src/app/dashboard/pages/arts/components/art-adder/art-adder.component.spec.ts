import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtAdderComponent } from './art-adder.component';

describe('ArtAdderComponent', () => {
  let component: ArtAdderComponent;
  let fixture: ComponentFixture<ArtAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
