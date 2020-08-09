import { TestBed } from '@angular/core/testing';

import { DesignersService } from './designers.service';

describe('DesignersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DesignersService = TestBed.get(DesignersService);
    expect(service).toBeTruthy();
  });
});
