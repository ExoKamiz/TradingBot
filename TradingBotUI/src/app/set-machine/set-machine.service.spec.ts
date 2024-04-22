import { TestBed } from '@angular/core/testing';

import { SetMachineService } from './set-machine.service';

describe('SetMachineService', () => {
  let service: SetMachineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetMachineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
