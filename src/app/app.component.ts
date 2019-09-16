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
      title: 'Login',
      path: '/',
      icon: 'account_box'
    },
    {
      title: 'Grupos',
      path: '/grupos',
      icon: 'view_module'
    },
    {
      title: 'Jornadas',
      path: '/jornadas',
      icon: 'sports_soccer'
    }
  ];

  constructor() {}

  toggleMobileNav(nav: MatSidenav) {
    nav.toggle();
  }
}
