import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreadorFormaComponent } from './creador-forma.component';

describe('CreadorFormaComponent', () => {
  let component: CreadorFormaComponent;
  let fixture: ComponentFixture<CreadorFormaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreadorFormaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreadorFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
