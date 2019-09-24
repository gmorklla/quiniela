import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, iif, of } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { DbService } from './../shared/services/db.service';
import { Partido, User } from '../shared/interfaces/general';
import { AngularFirestore } from '@angular/fire/firestore';
import { mergeMap, take, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
export const equipos = [
  {
    nombre: 'PSG',
    id: 1,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/mcpMspef1hwHwi9qrfp4YQ_48x48.png'
  },
  {
    nombre: 'Real Madrid',
    id: 2,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/Th4fAVAZeCJWRcKoLW7koA_48x48.png'
  },
  {
    nombre: 'Galatasaray',
    id: 3,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/TWjoccvTU4JXZJZ3aW3cVg_48x48.png'
  },
  {
    nombre: 'Club Brujas',
    id: 4,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/5FQBXpID1LAQJb0BOnmTpw_48x48.png'
  },
  {
    nombre: 'Tottenham',
    id: 5,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/k3Q_mKE98Dnohrcea0JFgQ_48x48.png'
  },
  {
    nombre: 'Bayern',
    id: 6,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/-_cmntP5q_pHL7g5LfkRiw_48x48.png'
  },
  {
    nombre: 'Olympiacos',
    id: 7,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/FqnQ9nu7UDiSgnXKohdIgg_48x48.png'
  },
  {
    nombre: 'Estrella Roja',
    id: 8,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/i26ntB7bZFvS6GkKj_gGcQ_48x48.png'
  },
  {
    nombre: 'Manchester City',
    id: 9,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/z44l-a0W1v5FmgPnemV6Xw_48x48.png'
  },
  {
    nombre: 'Atalanta',
    id: 10,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/0XmrZHobvb6ua5tgMOnTEA_48x48.png'
  },
  {
    nombre: 'Dynamo Zagreb',
    id: 11,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/izGdPix_nDr8lff08dKicA_48x48.png'
  },
  {
    nombre: 'Shaktar',
    id: 12,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/3rx1dndeeE1gb97w6et-GA_48x48.png'
  },
  {
    nombre: 'Juventus',
    id: 13,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/Lv6xmBlUIpN3GAFhtf6nqQ_48x48.png'
  },
  {
    nombre: 'Atlético de Madrid',
    id: 14,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/srAAE0bOnCppUrlbJpFiHQ_48x48.png'
  },
  {
    nombre: 'Bayern Leverkusen',
    id: 15,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/0zIcXiwD_JGY482DFC28Lw_48x48.png'
  },
  {
    nombre: 'Lokomotiv',
    id: 16,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/aTt14vQzxa_AqQ-EYRA5Sg_48x48.png'
  },
  {
    nombre: 'Liverpool',
    id: 17,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/0iShHhASp5q1SL4JhtwJiw_48x48.png'
  },
  {
    nombre: 'Napoli',
    id: 18,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/PWRLYBJqlGrAAsKkUN6eng_48x48.png'
  },
  {
    nombre: 'Red Bull Salzburg',
    id: 19,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/vQhr4NoE_4Yg1IhUZvbRNw_48x48.png'
  },
  {
    nombre: 'KRC Genk',
    id: 20,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/EIR0Ac3NhURLPE-ioY_G2A_48x48.png'
  },
  {
    nombre: 'Barcelona',
    id: 21,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/paYnEE8hcrP96neHRNofhQ_48x48.png'
  },
  {
    nombre: 'Dortmund',
    id: 22,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/FZnTSH2rbHFos4BnlWAItw_48x48.png'
  },
  {
    nombre: 'Inter',
    id: 23,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/gpWqqaYc9yESzfkfspryoA_48x48.png'
  },
  {
    nombre: 'Slavia Praga',
    id: 24,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/tRSwBKKIVP_X7nZv4xuHxQ_48x48.png'
  },
  {
    nombre: 'Zenit',
    id: 25,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/Im8hT6_KMvX_w3VQVolHDg_48x48.png'
  },
  {
    nombre: 'Benfica',
    id: 26,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/TnVPpMgpue_Vz_30C2HAPA_48x48.png'
  },
  {
    nombre: 'RB Leipzig',
    id: 27,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/R7-Lqc_SDxd97uWgoeUQ-g_48x48.png'
  },
  {
    nombre: 'Lyon',
    id: 28,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/SrKK55dUkCxe4mJsyshfCg_48x48.png'
  },
  {
    nombre: 'Chelsea',
    id: 29,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/fhBITrIlbQxhVB6IjxUO6Q_48x48.png'
  },
  {
    nombre: 'Ajax',
    id: 30,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/4b9b9O2fDwJepsLnYEoZng_48x48.png'
  },
  {
    nombre: 'Valencia',
    id: 31,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/QPbjvDwI_0Wuu4tCS2O6uw_48x48.png'
  },
  {
    nombre: 'Lille',
    id: 32,
    img:
      'https://ssl.gstatic.com/onebox/media/sports/logos/D2AQe8qoyPIP4K8MzLvwuA_48x48.png'
  }
];

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.css']
})
export class JornadasComponent implements OnInit {
  partidos: Observable<Partido[]>;
  pronosticos;
  pronosticosGenerales;
  usuarios;
  notificacion: { partido: Partido; usuario: User; pronostico: string };

  constructor(
    private db: DbService,
    public auth: AuthService,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getUsuarios();
    this.getPartidos();
    this.getPronosticos();
  }

  getUsuarios() {
    this.db.readCollection('users').subscribe(users => (this.usuarios = users));
  }

  getJornada(idx: number): number {
    return Number.isInteger(idx / 16)
      ? idx === 0
        ? 1
        : Math.floor(idx / 16) + 1
      : Math.floor(idx / 16) + 1;
  }

  getPartidos() {
    this.partidos = this.db.readCollection('partidos');
  }

  getPronosticos() {
    const { uid } = this.auth.getLoggedUser();
    this.db
      .readCollectionWIds('pronosticos')
      .pipe(
        tap((pronos: Array<any>) => {
          this.pronosticosGenerales = pronos;
          this.pronosticos = pronos.filter(val => val.id === uid)[0];
        })
      )
      .subscribe(_ => {});
  }

  savePronostico(e: string, partido: Partido) {
    const { uid, displayName, photoURL } = this.auth.getLoggedUser();
    this.notificacion = {
      partido,
      usuario: { uid, displayName, photoURL },
      pronostico: e
    };
    const ref = this.afs.collection('pronosticos').doc(uid);
    const obj = {};
    obj[partido.id] = {
      resultado: e
    };
    ref
      .valueChanges()
      .pipe(
        take(1),
        mergeMap(v => iif(() => !v, of(false), of(true)))
      )
      .subscribe(val => {
        if (val) {
          this.update(obj, uid);
        } else {
          this.set(obj, uid);
        }
      });
  }

  update(obj, uid) {
    const ref = this.afs.collection('pronosticos').doc(uid);
    ref
      .update(obj)
      .then(_ => {
        this.openSnackBar('Pronóstico guardado', 'Ok');
        this.getPronosticos();
        this.mandarNotificacion();
      })
      .catch(err =>
        console.error('%c error ', 'background: crimson; color: white;', err)
      );
  }

  set(obj, uid) {
    const ref = this.afs.collection('pronosticos').doc(uid);
    ref
      .set(obj)
      .then(_ => {
        this.mandarNotificacion();
        this.openSnackBar('Pronóstico guardado', 'Ok');
      })
      .catch(err =>
        console.error('%c error ', 'background: crimson; color: white;', err)
      );
  }

  mandarNotificacion() {
    const url =
      'https://us-central1-quiniela-6e42b.cloudfunctions.net/pronostico';
    const {
      usuario: { displayName, photoURL },
      partido: { local, visitante },
      pronostico
    } = this.notificacion;
    const lName = equipos.filter(eq => eq.id === local);
    const vName = equipos.filter(eq => eq.id === visitante);
    const params = new HttpParams()
      .set('usuario', displayName)
      .set('local', lName[0].nombre)
      .set('visitante', vName[0].nombre)
      .set('pronostico', pronostico)
      .set('photo', photoURL);
    this.http
      .get(url, { params })
      .subscribe(res => console.log('notificacion res', res));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  validaFecha(partido: Partido): boolean {
    const date = new Date();
    return partido.fecha.toDate() > date;
  }
}
