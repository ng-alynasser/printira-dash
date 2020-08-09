import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtEditorComponent } from './art-editor.component';

describe('ArtEditorComponent', () => {
  let component: ArtEditorComponent;
  let fixture: ComponentFixture<ArtEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
