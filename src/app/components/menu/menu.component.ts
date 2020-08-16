import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy, OnInit {
  private onDestroy$ = new Subject<void>();

  constructor(private router: Router) {
    this.router.events.pipe(takeUntil(this.onDestroy$))
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.removeMenu();
        }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  removeMenu(): void {
    const menu = document.querySelector('.navbar-collapse');
    menu.classList.remove('show');
  }
}
