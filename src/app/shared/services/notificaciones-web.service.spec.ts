import { TestBed } from '@angular/core/testing';

import { NotificacionesWebService } from './notificaciones-web.service';

describe('NotificacionesWebService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificacionesWebService = TestBed.get(NotificacionesWebService);
    expect(service).toBeTruthy();
  });
});
