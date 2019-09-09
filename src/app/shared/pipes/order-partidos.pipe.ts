import { Pipe, PipeTransform } from '@angular/core';
import { Partido } from './../interfaces/general';

@Pipe({
  name: 'orderPartidos'
})
export class OrderPartidosPipe implements PipeTransform {
  transform(partidos: Partido[], ...args: any[]): Partido[] {
    return partidos
      ? partidos.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
      : partidos;
  }
}
