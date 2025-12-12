import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnuncioPrestamoComponent } from './anuncio-prestamo.component';

describe('AnuncioPrestamoComponent', () => {
  let component: AnuncioPrestamoComponent;
  let fixture: ComponentFixture<AnuncioPrestamoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AnuncioPrestamoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnuncioPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
