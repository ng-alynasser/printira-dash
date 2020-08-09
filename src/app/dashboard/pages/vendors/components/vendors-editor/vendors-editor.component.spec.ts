import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsEditorComponent } from './vendors-editor.component';

describe('VendorsEditorComponent', () => {
  let component: VendorsEditorComponent;
  let fixture: ComponentFixture<VendorsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
