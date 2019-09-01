export interface Equipo {
  nombre: string;
  id: number;
  img: string;
}

export interface Grupos {
  grupo: string;
  equipos: Equipo[];
}

export interface Partido {
  id: number;
  local: number;
  visitante: number;
  fecha: number[];
}

export interface Jornada {
  jornada: number;
  partidos: Partido[];
}
