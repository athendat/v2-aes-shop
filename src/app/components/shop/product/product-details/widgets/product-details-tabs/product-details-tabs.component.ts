import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { QuestionAnswersState } from '../../../../../../shared/state/questions-answers.state';
import { ReviewState } from '../../../../../../shared/state/review.state';
import { GetQuestionAnswers } from '../../../../../../shared/action/questions-answers.action';
import { GetReview } from '../../../../../../shared/action/review.action';
import { QnAModel } from '../../../../../../shared/interface/questions-answers.interface';
import { Product } from '../../../../../../shared/interface/product.interface';
import { ReviewModel } from '../../../../../../shared/interface/review.interface';

@Component({
    selector: 'app-product-details-tabs',
    templateUrl: './product-details-tabs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsTabsComponent {

    #store = inject(Store);
    active = 'description';
    product = input<Product | null>();
    // question$: Observable<QnAModel> = this.#store.select(QuestionAnswersState.questionsAnswers);
    review$: Observable<ReviewModel> = this.#store.select(ReviewState.review);


    constructor() {
        effect(() => {
            this.#store.dispatch(new GetQuestionAnswers({ product_id: this.product()!.id }));
            this.#store.dispatch(new GetReview({ product_id: this.product()!.id }));
        })
    }

}
