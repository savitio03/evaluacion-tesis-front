import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirTesisComponent } from './subir-tesis.component';

describe('SubirTesisComponent', () => {
  let component: SubirTesisComponent;
  let fixture: ComponentFixture<SubirTesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubirTesisComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubirTesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
