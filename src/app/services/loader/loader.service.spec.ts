import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';
import { Subject } from 'rxjs';

describe('Service: Loader', () => {
  let service: LoaderService;
  let mock = new Subject<boolean>();

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
    mock = service.isLoading;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show', () => {
    service.show();

    mock.subscribe(data => {
      expect(data).toEqual(true);
    });
  });

  it('should hide', () => {
    service.hide();

    mock.subscribe(data => {
      expect(data).toEqual(false);
    });
  });
});
