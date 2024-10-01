import { TestBed } from '@angular/core/testing';

import { FaceSnapService } from './face-snap.service';

describe('FaceSnapService', () => {
  let service: FaceSnapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaceSnapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
