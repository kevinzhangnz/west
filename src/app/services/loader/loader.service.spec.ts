import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('Service: Loader', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
