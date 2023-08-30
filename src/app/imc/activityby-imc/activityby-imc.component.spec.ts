import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitybyImcComponent } from './activityby-imc.component';

describe('ActivitybyImcComponent', () => {
  let component: ActivitybyImcComponent;
  let fixture: ComponentFixture<ActivitybyImcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitybyImcComponent]
    });
    fixture = TestBed.createComponent(ActivitybyImcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
