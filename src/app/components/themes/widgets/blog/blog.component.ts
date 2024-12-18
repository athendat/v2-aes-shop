import { Component, Input, inject } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { BlogService } from '../../../../shared/services/blog.service';
import { BlogState } from '../../../../shared/state/blog.state';
import { Blog, BlogModel } from '../../../../shared/interface/blog.interface';
import * as data from '../../../../shared/data/owl-carousel';
import { RouterLink } from '@angular/router';
import { SkeletonBlogComponent } from '../../../blog/skeleton-blog/skeleton-blog.component';
import { NgStyle, DatePipe } from '@angular/common';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss'],
    imports: [CarouselModule, SkeletonBlogComponent, RouterLink, NgStyle, DatePipe]
})
export class BlogComponent {
  blogService = inject(BlogService);


  @Select(BlogState.blog) blog$: Observable<BlogModel>;

  @Input() blogIds: number[] = [];
  @Input() sliderOption: OwlOptions;

  public blogs: Blog[] = [];
  public skeletonItems = Array.from({ length: 5 }, (_, index) => index);
  public bannerSlider = data.customOptionsItem3;

  ngOnChanges() {
    if (Array.isArray(this.blogIds)) {
      this.blog$.subscribe(blogs => {
        this.blogs = blogs.data.filter(blog => this.blogIds?.includes(blog?.id!));
      });
    }
  }

 }
