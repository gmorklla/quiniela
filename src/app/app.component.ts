import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SwPush } from '@angular/service-worker';
import { NotificacionesWebService } from './shared/services/notificaciones-web.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  message;
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

  constructor(private msgService: NotificacionesWebService) {}

  ngOnInit() {
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
  }

  toggleMobileNav(nav: MatSidenav) {
    nav.toggle();
  }
}
