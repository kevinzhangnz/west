import { Injectable } from '@angular/core';

import { Toast } from '@models/index';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  constructor() { }

  show(toast: Toast, options: any = {}) {
    this.toasts.push({ ...toast, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts = [];
  }
}
