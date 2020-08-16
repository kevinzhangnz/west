import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';

import { MenuComponent } from './menu.component';

describe('Component: Menu', () => {
  const routerEventsSubject = new Subject<RouterEvent>();
  const routerStub = {
    events: routerEventsSubject.asObservable()
  };
  let router: Router;
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      providers: [
        {
          provide: Router,
          useValue: routerStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the menu on a navigation start', () => {
    const componentSpy = spyOn(component, 'removeMenu');
    routerEventsSubject.next(new NavigationStart(1, 'start'));

    expect(componentSpy).toHaveBeenCalled();
  });
});
