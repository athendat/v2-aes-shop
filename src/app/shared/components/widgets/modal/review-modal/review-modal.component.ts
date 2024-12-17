import { Component, TemplateRef, ViewChild, PLATFORM_ID, Inject, ChangeDetectionStrategy, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../../../../shared/interface/product.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SendReview, UpdateReview } from '../../../../../shared/action/review.action';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AuthStore } from 'src/app/shared/store/auth.store';

@Component({
    selector: 'app-review-modal',
    templateUrl: './review-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ReviewModalComponent {

    @ViewChild("reviewModal", { static: false }) ReviewModal: TemplateRef<string>;

    #notificationService = inject(NotificationService);
    authStore = inject(AuthStore);
    closeResult: string;
    modalOpen: boolean = false;
    product: Product;
    currentRate: number = 0;
    review = new FormControl('', [Validators.required])
    form: FormGroup;
    type: string;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private modalService: NgbModal,
        private store: Store,
    ) {
        this.form = new FormGroup({
            rating: new FormControl(5, [Validators.required]),
            description: new FormControl('Excelente producto')
        })
    }

    async openModal(product: Product, type: string) {
        if (isPlatformBrowser(this.platformId)) { // For SSR

            // Si el usuario no está autenticado, no puede enviar una reseña
            if (!this.authStore.isAuthenticated()) {
                this.#notificationService.showInfo('Por favor inicie sesión para enviar una reseña');
                return;
            }

            this.modalOpen = true;
            this.type = type;
            this.product = product;
            type && type === 'edit' && this.form.patchValue({ rating: product.user_review.rating, description: product.user_review.description })

            this.modalService.open(this.ReviewModal, {
                ariaLabelledBy: 'profile-Modal',
                centered: true,
                windowClass: 'theme-modal'
            }).result.then((result) => {
                `Result ${result}`
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }
    }

    private getDismissReason(reason: ModalDismissReasons): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    submit() {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            let data = {
                product_id: this.product.id,
                rating: this.form.get('rating')?.value,
                review_image_id: null,
                description: this.form.get('description')?.value
            }
            let action = new SendReview(data);

            if (this.type && this.type === 'edit' && this.product.user_review.id) {
                console.log('aqui');
                action = new UpdateReview(this.product.user_review.id, data)
            }

            console.log('aqui1');
            this.store.dispatch(action);
        }
    }
}
