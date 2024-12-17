import { Component, inject } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RefundState } from '../../../shared/state/refund.state';
import { GetRefund } from '../../../shared/action/refund.action';
import { RefundModel } from '../../../shared/interface/refund.interface';
import { Params } from '../../../shared/interface/core.interface';
import { TranslateModule } from '@ngx-translate/core';
import { TitleCasePipe } from '../../../shared/pipe/title-case.pipe';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { PaginationComponent } from '../../../shared/components/widgets/pagination/pagination.component';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-refund',
    templateUrl: './refund.component.html',
    styleUrls: ['./refund.component.scss'],
    standalone: true,
    imports: [PaginationComponent, NoDataComponent, AsyncPipe, DatePipe, TitleCasePipe, TranslateModule]
})
export class RefundComponent {
  private store = inject(Store);


  @Select(RefundState.refund) refund$: Observable<RefundModel>;

  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 10, // Display per page,
  };

  constructor() {
    this.store.dispatch(new GetRefund(this.filter));
  }

  setPaginate(page: number) {
    this.filter['page'] = page;
    this.store.dispatch(new GetRefund(this.filter));
  }

}
