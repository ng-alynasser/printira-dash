import { TestBed } from '@angular/core/testing';

import { ArtsService } from './arts.service';

describe('ArtsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtsService = TestBed.get(ArtsService);
    expect(service).toBeTruthy();
  });
});
