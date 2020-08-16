import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new Subject<boolean>();

  constructor() { }

  /* show the loader */
  show(): void {
    this.isLoading.next(true);
  }

  /* hide the loader */
  hide(): void {
    this.isLoading.next(false);
  }
}
