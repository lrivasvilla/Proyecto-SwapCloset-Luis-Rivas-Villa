import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnuncioPrestamoPage } from './anuncio-prestamo.page';

describe('AnuncioPrestamoPage', () => {
  let component: AnuncioPrestamoPage;
  let fixture: ComponentFixture<AnuncioPrestamoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioPrestamoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
