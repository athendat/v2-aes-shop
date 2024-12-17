import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { QuestionAnswersState } from '../../../../../../shared/state/questions-answers.state';
import { ReviewState } from '../../../../../../shared/state/review.state';
import { GetQuestionAnswers } from '../../../../../../shared/action/questions-answers.action';
import { GetReview } from '../../../../../../shared/action/review.action';
import { QnAModel } from '../../../../../../shared/interface/questions-answers.interface';
import { Product } from '../../../../../../shared/interface/product.interface';
import { ReviewModel } from '../../../../../../shared/interface/review.interface';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { QuestionsAnswersComponent } from '../questions-answers/questions-answers.component';
import { ProductReviewComponent } from '../product-review/product-review.component';
import { NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase, NgbNavContent, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-product-details-tabs',
    templateUrl: './product-details-tabs.component.html',
    styleUrls: ['./product-details-tabs.component.scss'],
    standalone: true,
    imports: [NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase, NgbNavContent, ProductReviewComponent, QuestionsAnswersComponent, NgbNavOutlet, AsyncPipe, TranslateModule]
})
export class ProductDetailsTabsComponent {
  private store = inject(Store);


  @Input() product: Product | null;

  @Select(QuestionAnswersState.questionsAnswers) question$: Observable<QnAModel>;
  @Select(ReviewState.review) review$: Observable<ReviewModel>;

  public active = 'description';

  ngOnChanges(changes: SimpleChanges) {
    let product = changes['product']?.currentValue;
    this.store.dispatch(new GetQuestionAnswers({product_id: product.id}));
    this.store.dispatch(new GetReview({product_id: product.id}));
  }
}
