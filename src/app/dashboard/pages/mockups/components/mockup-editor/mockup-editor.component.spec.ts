import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockupEditorComponent } from './mockup-editor.component';

describe('MockupEditorComponent', () => {
  let component: MockupEditorComponent;
  let fixture: ComponentFixture<MockupEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockupEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockupEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
