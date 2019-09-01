import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoTablaComponent } from './grupo-tabla.component';

describe('GrupoTablaComponent', () => {
  let component: GrupoTablaComponent;
  let fixture: ComponentFixture<GrupoTablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoTablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
