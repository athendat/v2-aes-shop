import { Component, Input, OnChanges, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '../../../../../../shared/interface/core.interface';
import { TranslateModule } from '@ngx-translate/core';
import { TitleCasePipe } from '../../../../../../shared/pipe/title-case.pipe';


@Component({
    selector: 'app-collection-filter',
    templateUrl: './collection-filter.component.html',
    styleUrls: ['./collection-filter.component.scss'],
    imports: [TitleCasePipe, TranslateModule]
})
export class CollectionFilterComponent implements OnChanges {
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  @Input() filter: Params;
  public filters: string[];

  public filtersObj: { [key: string]: string[] } = {
    category: [],
    tag: [],
    rating: [],
    price: [],
    attribute: []
  };

  ngOnChanges() {
    this.filtersObj = {
      category: this.splitFilter('category'),
      tag: this.splitFilter('tag'),
      rating: this.splitFilter('rating'),
      price: this.splitFilter('price'),
      attribute: this.splitFilter('attribute')
    };

    this.filters = this.mergeFilters();
  }

  remove(tag: string) {
    Object.keys(this.filtersObj).forEach((key) => {
      this.filtersObj[key] = this.filtersObj[key].filter((val: string) => {
        if (key === 'rating') {
          return val !== tag.replace(/^rating /, '');
        }
        return val !== tag;
      });
    });

    this.filters = this.mergeFilters();

    const params: Params = {};
    Object.keys(this.filtersObj).forEach((key) => {
      params[key] = this.filtersObj[key].length ? this.filtersObj[key].join(',') : null;
    });

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }

  clear() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: null,
      skipLocationChange: false
    });
  }

  private splitFilter(filterKey: keyof Params): string[] {
    return this.filter && this.filter[filterKey] ? this.filter[filterKey].split(',') : [];
  }

  private mergeFilters(): string[] {
    return [
      ...this.filtersObj['category'],
      ...this.filtersObj['tag'],
      ...this.filtersObj['rating'].map(val => val.startsWith('rating ') ? val : `rating ${val}`),
      ...this.filtersObj['price'],
      ...this.filtersObj['attribute']
    ];
  }
}
