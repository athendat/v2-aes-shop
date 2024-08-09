import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetOrders, ViewOrder, Checkout, PlaceOrder, Clear, VerifyPayment, RePayment } from "../action/order.action";
import { Order, OrderCheckout } from "../interface/order.interface";
import { OrderService } from "../services/order.service";
import { ClearCart } from "../action/cart.action";
import { NotificationService } from "../services/notification.service";

export class OrderStateModel {
    order = {
        data: [] as Order[],
        total: 0
    }
    selectedOrder: Order | null
    checkout: OrderCheckout | null
}

@State<OrderStateModel>({
    name: "order",
    defaults: {
        order: {
            data: [],
            total: 0
        },
        selectedOrder: null,
        checkout: null
    },
})
@Injectable()
export class OrderState {

    private store = inject(Store);
    private router = inject(Router);
    private orderService = inject(OrderService);
    private notificationService = inject(NotificationService);

    @Selector()
    static order(state: OrderStateModel) {
        return state.order;
    }

    @Selector()
    static selectedOrder(state: OrderStateModel) {
        return state.selectedOrder;
    }

    @Selector()
    static checkout(state: OrderStateModel) {
        return state.checkout;
    }

    @Action(GetOrders)
    getOrders(ctx: StateContext<OrderStateModel>, action: GetOrders) {
        return this.orderService.getOrders(action?.payload).pipe(
            tap({
                next: result => {
                    ctx.patchState({
                        order: {
                            data: result.data,
                            total: result?.total ? result?.total : result.data?.length
                        }
                    });
                },
                error: err => {
                    throw new Error(err?.error?.message);
                }
            })
        );
    }

    @Action(ViewOrder)
    viewOrder(ctx: StateContext<OrderStateModel>, { id }: ViewOrder) {
        this.orderService.skeletonLoader = true;
        return this.orderService.findOrderByNumber(id).pipe(
            tap({
                next: result => {

                    const state = ctx.getState();

                    ctx.patchState({
                        ...state,
                        selectedOrder: result
                    });
                },
                error: err => {
                    throw new Error(err?.error?.message);
                },
                complete: () => {
                    this.orderService.skeletonLoader = false;
                }
            })
        );
    }

    @Action(Checkout)
    checkout(ctx: StateContext<OrderStateModel>, action: Checkout) {

        const state = ctx.getState();

        const cart = this.store.selectSnapshot(state => state.cart);

        // It Just Static Values as per cart default value (When you are using api then you need calculate as per your requirement)
        const order = {
            total: {
                convert_point_amount: 0,
                convert_wallet_balance: 0,
                coupon_total_discount: 0,
                points: 0,
                points_amount: 0,
                shipping_total: 0,
                sub_total: cart.total,
                tax_total: 0,
                total: cart.total,
                wallet_balance: 0,
            }
        }

        ctx.patchState({
            ...state,
            checkout: order
        });

    }

    @Action(PlaceOrder)
    placeOrder(ctx: StateContext<OrderStateModel>, action: PlaceOrder) {

        // Place Order Logic Here
        this.orderService.createOrder(action.payload).subscribe({
            next: result => {

                // Mostrar mensaje de éxito
                this.notificationService.showSuccess(result.message!);

                // Limpiar carrito
                ctx.dispatch(new ClearCart());

                // Redirigir a la página de detalles del pedido
                this.router.navigateByUrl(`/account/order/details/${result.data!.order_number}`);
            },
            error: err => {

                console.warn(err);

                throw new Error(err?.error?.message);
            }
        });
    }

    @Action(RePayment)
    verifyPayment(ctx: StateContext<OrderStateModel>, action: RePayment) {
        // Verify Payment Logic Here
    }

    @Action(VerifyPayment)
    rePayment(ctx: StateContext<OrderStateModel>, action: VerifyPayment) {
        // Re Payment Logic Here
    }

    @Action(Clear)
    clear(ctx: StateContext<OrderStateModel>) {
        const state = ctx.getState();
        ctx.patchState({
            ...state,
            checkout: null
        });
    }

}
