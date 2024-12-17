import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-skeleton-blog',
    templateUrl: './skeleton-blog.component.html',
    styleUrls: ['./skeleton-blog.component.scss'],
    standalone: false
})
export class SkeletonBlogComponent {

  @Input() type: string = 'grid';

  constructor() {}

}
