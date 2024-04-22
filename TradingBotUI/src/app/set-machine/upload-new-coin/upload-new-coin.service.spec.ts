import { TestBed } from '@angular/core/testing';

import { UploadNewCoinService } from './upload-new-coin.service';

describe('UploadNewCoinService', () => {
  let service: UploadNewCoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadNewCoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
