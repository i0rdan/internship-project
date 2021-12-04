import { TestBed } from '@angular/core/testing';

import { HttpcliService } from './httpcli.service';

describe('HttpcliService', () => {
  let service: HttpcliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpcliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
