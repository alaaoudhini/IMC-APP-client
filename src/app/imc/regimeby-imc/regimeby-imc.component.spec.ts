import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegimebyIMCComponent } from './regimeby-imc.component';

describe('RegimebyIMCComponent', () => {
  let component: RegimebyIMCComponent;
  let fixture: ComponentFixture<RegimebyIMCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegimebyIMCComponent]
    });
    fixture = TestBed.createComponent(RegimebyIMCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
