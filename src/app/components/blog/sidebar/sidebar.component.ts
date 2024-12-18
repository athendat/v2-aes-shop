import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BlogService } from '../../../shared/services/blog.service';
import { BlogState } from '../../../shared/state/blog.state';
import { TagState } from '../../../shared/state/tag.state';
import { CategoryState } from '../../../shared/state/category.state';
import { TagModel } from '../../../shared/interface/tag.interface';
import { CategoryModel } from '../../../shared/interface/category.interface';
import { GetTags } from '../../../shared/action/tag.action';
import { Blog } from '../../../shared/interface/blog.interface';
import { GetRecentBlog } from '../../../shared/action/blog.action';
import { TranslateModule } from '@ngx-translate/core';
import { BlogTagComponent } from './blog-tag/blog-tag.component';
import { BlogCategoryComponent } from './blog-category/blog-category.component';
import { RecentPostComponent } from './recent-post/recent-post.component';
import { NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionToggle, NgbAccordionButton, NgbCollapse, NgbAccordionCollapse, NgbAccordionBody } from '@ng-bootstrap/ng-bootstrap';
import { SkeletonBlogComponent } from '../skeleton-blog/skeleton-blog.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-blog-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [SkeletonBlogComponent, NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionToggle, NgbAccordionButton, NgbCollapse, NgbAccordionCollapse, NgbAccordionBody, RecentPostComponent, BlogCategoryComponent, BlogTagComponent, AsyncPipe, TranslateModule]
})
export class BlogSidebarComponent {
  blogService = inject(BlogService);
  private store = inject(Store);


  @Select(BlogState.resentBlog) resentBlog$: Observable<Blog[]>;
  @Select(TagState.tag) tag$: Observable<TagModel>;
  @Select(CategoryState.category) category$: Observable<CategoryModel>;

  constructor(){
    this.store.dispatch(new GetTags({status: 1, type: 'post'}))
    this.store.dispatch(new GetRecentBlog({status: 1, type: 'post', paginate: 5}))
  }

}
