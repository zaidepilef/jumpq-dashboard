import { TestBed } from '@angular/core/testing';

import { JumpqService } from './jumpq.service';

describe('JumpqService', () => {
  let service: JumpqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JumpqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
