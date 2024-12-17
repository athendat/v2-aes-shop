import { ChangeDetectionStrategy, Component, Input, ViewChild, input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { ReviewModalComponent } from '../../../../../../shared/components/widgets/modal/review-modal/review-modal.component';
import { Review } from '../../../../../../shared/interface/review.interface';

@Component({
    selector: 'app-product-review',
    templateUrl: './product-review.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ProductReviewComponent {

    product = input<Product | null>();
    reviews = input<Review[]>([]);

    @ViewChild("reviewModal") ProfileModal: ReviewModalComponent;

}
