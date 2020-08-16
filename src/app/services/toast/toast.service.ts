import { Injectable } from '@angular/core';

import { Toast } from '@models/index';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  constructor() { }

  show(toast: Toast, options: any): void {
    this.toasts.push({ ...toast, ...options });
  }

  remove(toast: any): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear(): void {
    this.toasts = [];
  }
}
