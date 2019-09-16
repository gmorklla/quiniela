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
  dataToShow: PronosticosData[];
  displayedColumns: string[] = ['nombre', 'resultado'];

  constructor() {}

  ngOnInit() {
    this.dataToShow = this.pronosticosGenerales.map(val => {
      return {
        ...val[this.partido],
        nombre: this.usuarios
          .filter(users => users.uid === val.id)
          .map(user => (user ? user.displayName : ''))
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
