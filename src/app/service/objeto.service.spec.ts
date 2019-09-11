import { TestBed } from '@angular/core/testing';

import { ObjetoService } from './objeto.service';

describe('ObjetoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObjetoService = TestBed.get(ObjetoService);
    expect(service).toBeTruthy();
  });
});
