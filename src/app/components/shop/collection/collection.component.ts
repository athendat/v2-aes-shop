import { ChangeDetectionStrategy, Component, OnInit, effect, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Params } from '../../../shared/interface/core.interface';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { ProductModel } from '../../../shared/interface/product.interface';
import { GetProducts } from '../../../shared/action/product.action';
import { ProductState } from '../../../shared/state/product.state';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionComponent implements OnInit {

    @Select(ProductState.product) product$: Observable<ProductModel>;
    @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;

    field = input('');
    price = input('');
    category = input('all');
    tag = input('');
    sort = input('');
    sortBy = input('');
    rating = input('');
    attribute = input('');

    breadcrumb: Breadcrumb = {
        title: "Productos",
        items: [{ label: 'Productos', active: false }]
    };
    layout: string = 'collection_category_slider';
    skeleton: boolean = true;

    filter: Params = {
        'page': 1, // Current page number
        'paginate': 200, // Display per page, // Note we are using json thats why its it static
        'status': 1,
        'field': '',
        'price': '',
        'category': '',
        'tag': '',
        'sort': '', // ASC, DSC
        'sortBy': '',
        'rating': '',
        'attribute': ''
    };

    public totalItems: number = 0;

    #route = inject(ActivatedRoute);
    #store = inject(Store);

    constructor() {
        effect(() => {

            console.log('Categoría', this.category())
        })
    }


    ngOnInit(): void {

        // Get Query params..
        this.#route.queryParams.subscribe(params => {
            this.filter = {
                'page': params['page'] ? params['page'] : 1,
                'paginate': 200, // Note we are using json thats why its it static
                'status': 1,
                'field': params['field'] ? params['field'] : this.filter['field'],
                'price': params['price'] ? params['price'] : '',
                'category': params['category'] ? params['category'] : '',
                'tag': params['tag'] ? params['tag'] : '',
                'sort': params['sort'] ? params['sort'] : '',
                'sortBy': params['sortBy'] ? params['sortBy'] : this.filter['sortBy'],
                'rating': params['rating'] ? params['rating'] : '',
                'attribute': params['attribute'] ? params['attribute'] : '',
            }

            this.#store.dispatch(new GetProducts(this.filter));

            // Params For Demo Purpose only
            if (params['layout']) {
                this.layout = params['layout'];
            } else {
                // Get Collection Layout
                this.themeOptions$.subscribe(option => {
                    this.layout = option?.collection && option?.collection?.collection_layout
                        ? option?.collection?.collection_layout : 'collection_category_slider';
                });
            }

            this.filter['layout'] = this.layout;
        });

        this.product$.subscribe(product => this.totalItems = product?.total);
    }


}
