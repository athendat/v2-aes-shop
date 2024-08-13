import { Injectable, inject } from "@angular/core";
import { Router } from '@angular/router';
import { tap } from "rxjs";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Product } from "../interface/product.interface";
import { AddToWishlist, DeleteWishlist, GetWishlist } from "../action/wishlist.action";
import { WishlistService } from "../services/wishlist.service";
import { NotificationService } from "../services/notification.service";

export class WishlistStateModel {
    wishlist = {
        data: [] as Product[],
        total: 0
    }
}

@State<WishlistStateModel>({
    name: "wishlist",
    defaults: {
        wishlist: {
            data: [],
            total: 0
        }
    },
})

@Injectable()
export class WishlistState {


    public router = inject(Router);
    private wishlistService = inject(WishlistService);
    private notify = inject(NotificationService);



    @Selector()
    static wishlistItems(state: WishlistStateModel) {
        return state.wishlist;
    }

    @Action(GetWishlist)
    getWishlistItems(ctx: StateContext<GetWishlist>) {
        this.wishlistService.skeletonLoader = true;
        return this.wishlistService.getWishlistItems().pipe(
            tap({
                next: result => {
                    ctx.patchState({
                        wishlist: {
                            data: result.data,
                            total: result?.total ? result?.total : result.data?.length
                        }
                    });
                },
                complete: () => {
                    this.wishlistService.skeletonLoader = false;
                },
                error: err => {
                    throw new Error(err?.error?.message);
                }
            })
        );
    }

    @Action(AddToWishlist)
    add(ctx: StateContext<WishlistStateModel>, action: AddToWishlist) {
        // Add Wishlist Logic Here
        const state = ctx.getState();

        console.log(action);

        this.wishlistService.addWishlistItem(action.payload["product_id"]).subscribe({
            next: (result) => {

                // Mostrar notificación
                this.notify.showSuccess(result.message!);

            },
            error: (err: any) => {
                this.notify.showError(err?.error?.message.message);
            }
        });

    }

    @Action(DeleteWishlist)
    delete(ctx: StateContext<WishlistStateModel>, { id }: DeleteWishlist) {

        // Delete Wishlist Logic Here
        this.wishlistService.removeWishlistItem(id).subscribe({
            next: (result) => {

                const state = ctx.getState();
                let item = state.wishlist.data.filter(value => value.id !== id);
                ctx.patchState({
                    wishlist: {
                        data: item,
                        total: state.wishlist.total - 1
                    }
                });

                // Mostrar notificación
                this.notify.showSuccess(result.message!);
            },
            error: (err: any) => {
                this.notify.showError(err?.error?.message.message);
            }
        });


    }
}
