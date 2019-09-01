import { Component, EventEmitter, Output } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Quiniela';
  nav = [
    {
      title: 'Grupos',
      path: '/'
    },
    {
      title: 'Jornadas',
      path: '/jornadas'
    }
  ];

  constructor() {}

  toggleMobileNav(nav: MatSidenav) {
    nav.toggle();
  }
}
