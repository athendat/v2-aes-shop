import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Blog } from '../../../shared/interface/blog.interface';
import { BlogState } from '../../../shared/state/blog.state';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';
import { BlogSidebarComponent } from '../sidebar/sidebar.component';
import { NgClass, NgStyle, AsyncPipe, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-blog-details',
    templateUrl: './blog-details.component.html',
    styleUrls: ['./blog-details.component.scss'],
    imports: [BreadcrumbComponent, NgClass, BlogSidebarComponent, NgStyle, AsyncPipe, DatePipe]
})
export class BlogDetailsComponent {
  private meta = inject(Meta);
  private route = inject(ActivatedRoute);


  @Select(BlogState.selectedBlog) blog$: Observable<Blog>;
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: "Product",
    items: []
  }

  public sidebar: string;

  constructor(){
    this.blog$.subscribe(blog => {
      this.breadcrumb.items = [];
      this.breadcrumb.title = blog.title;
      this.breadcrumb.items.push({ label: 'Blog', active: true }, { label: blog.title, active: false });
      blog?.meta_title && this.meta.updateTag({property: 'og:title', content: blog?.meta_title});
      blog?.meta_description && this.meta.updateTag({property: 'og:description', content: blog?.meta_description});
    });

    // For Demo Purpose only
    this.route.queryParams.subscribe(params => {
      if(params['sidebar']) {
        this.sidebar = params['sidebar'];
      } else {
        // Get Blog Layout
        this.themeOption$.subscribe(theme => {
          this.sidebar = theme?.blog.blog_sidebar_type;
        });
      }
    });
  }

}
