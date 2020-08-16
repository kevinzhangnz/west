import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Configuration } from '@config/index';
import { Comment, Post } from '@models/index';
import { PostsService } from '@services/index';
import { PostComponent } from './post.component';

describe('Component: Post', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let postsService: PostsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        Configuration,
        PostsService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    postsService = TestBed.inject(PostsService);
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    spyOn(component, 'getComments');
    spyOn(component, 'getPost');

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.getComments).toHaveBeenCalled();
    expect(component.getPost).toHaveBeenCalled();
  });

  it('should call getComments and return a list of comments', () => {
    const mock: Comment[] = [new Comment()];
    spyOn(postsService, 'readCommentsById').and.returnValue(of(mock));

    component.getComments(1);
    fixture.detectChanges();

    expect(component.comments).toEqual(mock);
    expect(component.comments.length).toBe(1);
  });

  it('should call getPost and return the post', () => {
    const mock: Post = new Post();
    spyOn(postsService, 'readById').and.returnValue(of(mock));

    component.getPost(1);
    fixture.detectChanges();

    expect(component.post).toEqual(mock);
  });
});
