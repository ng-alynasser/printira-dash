import { TestBed } from '@angular/core/testing';

import { MockupsService } from './mockups.service';

describe('MockupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockupsService = TestBed.get(MockupsService);
    expect(service).toBeTruthy();
  });
});
