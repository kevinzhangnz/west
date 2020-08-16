import { Injectable } from '@angular/core';

import { Toast } from '@models/index';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  constructor() { }

  /** show toast
   *  @param toast: toast object
   *  @param options: options object
   */
  show(toast: Toast, options: any): void {
    this.toasts.push({ ...toast, ...options });
  }

  /** remove toast
   *  @param toast: toast object
   */
  remove(toast: any): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  /** clear toasts */
  clear(): void {
    this.toasts = [];
  }
}
