import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreadorJuegosComponent } from './creador-juegos.component';

describe('CreadorJuegosComponent', () => {
  let component: CreadorJuegosComponent;
  let fixture: ComponentFixture<CreadorJuegosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreadorJuegosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreadorJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
