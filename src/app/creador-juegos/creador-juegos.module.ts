import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { CreadorJuegosRoutingModule } from './creador-juegos-routing.module';
import { CreadorJuegosComponent } from './creador-juegos.component';
import { CreadorFormaComponent } from './creador-forma/creador-forma.component';

@NgModule({
  declarations: [CreadorJuegosComponent, CreadorFormaComponent],
  imports: [
    CommonModule,
    CreadorJuegosRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    NgbTimepickerModule
  ]
})
export class CreadorJuegosModule {}
