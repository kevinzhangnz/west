import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ToastService } from '@services/index';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy, OnInit {
  private onDestroy$ = new Subject<void>();

  constructor(private router: Router,
              private toastService: ToastService) {
    this.router.events.pipe(takeUntil(this.onDestroy$))
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.toastService.clear();
        }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
