import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '../../../../../../shared/interface/core.interface';
import { CurrencySymbolPipe } from '../../../../../../shared/pipe/currency-symbol.pipe';
import { TranslateModule } from '@ngx-translate/core';


@Component({
    selector: 'app-collection-price-filter',
    templateUrl: './collection-price-filter.component.html',
    styleUrls: ['./collection-price-filter.component.scss'],
    providers:[CurrencySymbolPipe],
    imports: [CurrencySymbolPipe, TranslateModule]
})
export class CollectionPriceFilterComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  @Input() filter: Params;

  public prices = [
    {
      id: 1,
      price: 10,
      text: 'below',
      value: '10'
    },
    {
      id: 2,
      minPrice: 10,
      maxPrice: 20,
      value: '0-20'
    },
    {
      id: 3,
      minPrice: 20,
      maxPrice: 40,
      value: '20-40'
    },
    {
      id: 4,
      minPrice: 40,
      maxPrice: 60,
      value: '40-60'
    },
    {
      id: 5,
      minPrice: 60,
      maxPrice: 80,
      value: '60-80'
    },
    {
      id: 6,
      minPrice: 80,
      maxPrice: 100,
      value: '80-100'
    },
    {
      id: 7,
      price: 100,
      text: 'above',
      value: '100'
    }
  ]

  public selectedPrices: string[] = [];

  ngOnChanges() {
    this.selectedPrices = this.filter['price'] ? this.filter['price'].split(',') : [];
  }

  applyFilter(event: Event) {
    const index = this.selectedPrices.indexOf((<HTMLInputElement>event?.target)?.value);  // checked and unchecked value

    if ((<HTMLInputElement>event?.target)?.checked)
      this.selectedPrices.push((<HTMLInputElement>event?.target)?.value); // push in array cheked value
    else
      this.selectedPrices.splice(index,1);  // removed in array unchecked value

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        price: this.selectedPrices.length ? this.selectedPrices.join(",") : null
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }

  // check if the item are selected
  checked(item: string){
    if(this.selectedPrices?.indexOf(item) != -1){
      return true;
    }
    return false;
  }

}
