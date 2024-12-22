import { Injectable, inject } from "@angular/core";
import { tap } from "rxjs";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { NotificationService } from "../services/notification.service";
import { ReviewService } from "../services/review.service";
import { Review } from "../interface/review.interface";
import { GetReview, SetReviews, SendReview, UpdateReview } from "../action/review.action";

export class ReviewStateModel {
    review = {
        data: [] as Review[],
        total: 0
    }
}

@State<ReviewStateModel>({
    name: "review",
    defaults: {
        review: {
            data: [],
            total: 0
        },
    },
})
@Injectable()
export class ReviewState {
    private reviewsService = inject(ReviewService);
    private notificationService = inject(NotificationService);


    @Selector()
    static review(state: ReviewStateModel) {
        return state.review;
    }

    @Action(GetReview)
    getReview(ctx: StateContext<ReviewStateModel>, action: GetReview) {
        return this.reviewsService.getReview(action.payload).pipe(
            tap({
                next: result => {
                    ctx.patchState({
                        review: {
                            data: result.data,
                            total: result?.total ? result?.total : result.data ? result.data.length : 0
                        }
                    });
                },
                error: err => {
                    throw new Error(err?.error?.message);
                }
            })
        );
    }

    @Action(SetReviews)
    setReviews(ctx: StateContext<ReviewStateModel>, { payload }: SetReviews) {
        ctx.patchState({
            review: {
                data: payload,
                total: payload?.length ? payload?.length : payload ? payload.length : 0
            }
        });
    }

    @Action(SendReview)
    sendReview(ctx: StateContext<ReviewStateModel>, action: SendReview) {
        // Submit Review Logic Here
        this.reviewsService.createReview(action.payload).subscribe({
            next: result => {

                // Mostrar notificación
                this.notificationService.showSuccess(result.message!);

                // Actualizar la lista de reseñas
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    review: {
                        data: [
                            ...(state.review.data),
                            result.data!
                        ],
                        total: state.review.total + 1
                    }
                });
            },
            error: err => {
                this.notificationService.showError(err?.error.message?.message);
            }
        });
    }

    @Action(UpdateReview)
    update(ctx: StateContext<ReviewStateModel>, { payload, id }: UpdateReview) {
        // Update Review Logic Here
    }

}
