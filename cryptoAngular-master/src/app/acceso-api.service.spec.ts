import { TestBed } from '@angular/core/testing';

import { AccesoAPIService } from './acceso-api.service';

describe('AccesoAPIService', () => {
  let service: AccesoAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccesoAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
