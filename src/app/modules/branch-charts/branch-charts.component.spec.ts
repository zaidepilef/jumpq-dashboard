import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchChartsComponent } from './branch-charts.component';

describe('BranchChartsComponent', () => {
  let component: BranchChartsComponent;
  let fixture: ComponentFixture<BranchChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
