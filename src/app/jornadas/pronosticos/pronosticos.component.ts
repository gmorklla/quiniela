import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { User } from 'src/app/shared/interfaces/general';

export interface PronosticosData {
  nombre: string;
  resultado: string;
  acertado: boolean;
}

@Component({
  selector: 'app-pronosticos',
  templateUrl: './pronosticos.component.html',
  styleUrls: ['./pronosticos.component.css']
})
export class PronosticosComponent implements OnInit, OnChanges {
  @Input() partido: number;
  @Input() pronosticosGenerales;
  @Input() usuarios: User[];
  @Input() resultado: string;
  dataToShow: PronosticosData[];
  displayedColumns: string[] = ['nombre', 'resultado', 'acertado'];

  constructor() {}

  ngOnInit() {
    this.dataToShow = this.pronosticosGenerales.map(val => {
      return {
        ...val[this.partido],
        nombre: this.usuarios
          .filter(users => users.uid === val.id)
          .map(user => (user ? user.displayName : '')),
        acertado:
          val[this.partido] && this.resultado
            ? val[this.partido].resultado === this.resultado
            : null
      };
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pronosticosGenerales) {
      this.dataToShow = this.pronosticosGenerales.map(val => {
        return {
          ...val[this.partido],
          nombre: this.usuarios
            .filter(users => users.uid === val.id)
            .map(user => (user ? user.displayName : ''))
        };
      });
    }
  }
}
