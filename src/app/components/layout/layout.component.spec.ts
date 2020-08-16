import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';

import { ToastService } from '@services/index';
import { LayoutComponent } from './layout.component';

describe('Component: Layout', () => {
  const routerEventsSubject = new Subject<RouterEvent>();
  const routerStub = {
    events: routerEventsSubject.asObservable()
  };
  let router: Router;
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let toastService: ToastService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutComponent ],
      providers: [
        {
          provide: Router,
          useValue: routerStub
        },
        {
          provide: ToastService,
          useValue: {
            clear: jasmine.createSpy(),
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    toastService = TestBed.inject(ToastService);
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the toast on a navigation start', () => {
    routerEventsSubject.next(new NavigationStart(1, 'start'));

    expect(toastService.clear).toHaveBeenCalled();
  });
});
