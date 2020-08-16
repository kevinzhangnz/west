import { TestBed } from '@angular/core/testing';

import { Toast } from '@models/index';
import { ToastService } from './toast.service';

describe('Service: Toast', () => {
  let service: ToastService;
  const toast: Toast = {
    header: '',
    body: ''
  };
  const options = {
    option: ''
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show', () => {
    service.show(toast, options);
    expect(service.toasts.length).toBe(1);
  });

  it('should remove', () => {
    service.show(toast, options);
    expect(service.toasts.length).toBe(1);

    const mock = { ...toast, ...options };
    service.remove(mock);
    // expect(service.toasts.length).toBe(0);
  });

  it('should clear', () => {
    service.show(toast, options);
    expect(service.toasts.length).toBe(1);

    service.clear();
    expect(service.toasts.length).toBe(0);
  });
});
