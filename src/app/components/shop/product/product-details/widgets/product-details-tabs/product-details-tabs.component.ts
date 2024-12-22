import { Component,  input } from '@angular/core';

import { select } from '@ngxs/store';
import { TranslateModule } from '@ngx-translate/core';
import { NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase, NgbNavContent, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';

import { QuestionAnswersState } from '../../../../../../shared/state/questions-answers.state';
import { ReviewState } from '../../../../../../shared/state/review.state';

import { QuestionsAnswersComponent } from '../questions-answers/questions-answers.component';
import { ProductReviewComponent } from '../product-review/product-review.component';

import { Product } from '../../../../../../shared/interface/product.interface';

@Component({
    selector: 'app-product-details-tabs',
    templateUrl: './product-details-tabs.component.html',
    styleUrls: ['./product-details-tabs.component.scss'],
    imports: [NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase, NgbNavContent, ProductReviewComponent, QuestionsAnswersComponent, NgbNavOutlet, TranslateModule]
})
export class ProductDetailsTabsComponent {

    active = 'description';
    product = input<Product | null>();
    question = select(QuestionAnswersState.questionsAnswers);
    review = select(ReviewState.review);

}
