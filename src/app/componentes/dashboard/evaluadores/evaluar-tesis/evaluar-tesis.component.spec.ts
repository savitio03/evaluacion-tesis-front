import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluarTesisComponent } from './evaluar-tesis.component';

describe('EvaluarTesisComponent', () => {
  let component: EvaluarTesisComponent;
  let fixture: ComponentFixture<EvaluarTesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluarTesisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluarTesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
