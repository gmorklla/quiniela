import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NotificacionesWebService } from '../shared/services/notificaciones-web.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  isEnabled;
  isGranted;

  constructor(
    private swPush: SwPush,
    private webNotificationService: NotificacionesWebService
  ) {}

  ngOnInit() {
    this.isEnabled = this.swPush.isEnabled;
    this.isGranted = Notification.permission === 'granted';
  }

  submitNotification(): void {
    this.webNotificationService.getPermission();
  }
}
