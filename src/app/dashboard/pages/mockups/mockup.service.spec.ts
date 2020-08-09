import { TestBed } from '@angular/core/testing';

import { MockupService } from './mockup.service';

describe('MockupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockupService = TestBed.get(MockupService);
    expect(service).toBeTruthy();
  });
});
