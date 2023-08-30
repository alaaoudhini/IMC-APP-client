import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculImcComponent } from './calcul-imc.component';

describe('CalculImcComponent', () => {
  let component: CalculImcComponent;
  let fixture: ComponentFixture<CalculImcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculImcComponent]
    });
    fixture = TestBed.createComponent(CalculImcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
