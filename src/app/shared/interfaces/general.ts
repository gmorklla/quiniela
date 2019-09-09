export interface Equipo {
  nombre: string;
  id: number;
  img: string;
}

export interface Grupos {
  grupo: string;
  equipos: Equipo[];
}

export interface User {
  uid: string;
  displayName: string;
  photoURL: string;
}

export interface Partido {
  fecha: any;
  id: number;
  local: number;
  visitante: number;
}
