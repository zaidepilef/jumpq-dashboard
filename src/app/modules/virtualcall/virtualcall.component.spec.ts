import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualcallComponent } from './virtualcall.component';

describe('VirtualcallComponent', () => {
  let component: VirtualcallComponent;
  let fixture: ComponentFixture<VirtualcallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualcallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualcallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
