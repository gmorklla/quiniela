import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PronosticosComponent } from './pronosticos.component';

describe('PronosticosComponent', () => {
  let component: PronosticosComponent;
  let fixture: ComponentFixture<PronosticosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PronosticosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PronosticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
