import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Configuration } from '@config/index';
import { Post } from '@models/index';
import { PostsService } from '@services/index';
import { PostsComponent } from './posts.component';

describe('Component: Posts', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let postsService: PostsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        Configuration,
        PostsService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    postsService = TestBed.inject(PostsService);
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    spyOn(component, 'getPosts');

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.getPosts).toHaveBeenCalled();
  });

  it('should call getPosts and return a list of posts', () => {
    const mock: Post[] = [new Post()];
    spyOn(postsService, 'read').and.returnValue(of(mock));

    component.getPosts();
    fixture.detectChanges();

    expect(component.posts).toEqual(mock);
    expect(component.posts.length).toBe(1);
  });
});
