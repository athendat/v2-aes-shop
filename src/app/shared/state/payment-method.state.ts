import { Injectable, inject } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetPaymentMethods } from "../action/payment-method.action";
import { PaymentMethod } from "../interface/payment-method.interface";
import { PaymentMethodService } from "../services/payment-method.service";
import { NotificationService } from "../services/notification.service";

export class PaymentMethodStateModel {
    paymentMethod = {
        data: [] as PaymentMethod[],
        total: 0
    }
    selectedPaymentMethod: PaymentMethod | null;
}

@State<PaymentMethodStateModel>({
    name: "PaymentMethod",
    defaults: {
        paymentMethod: {
            data: [],
            total: 0
        },
        selectedPaymentMethod: null
    },
})
@Injectable()
export class PaymentMethodState {

    private paymentMethodService = inject(PaymentMethodService);

    @Selector()
    static paymentMethod(state: PaymentMethodStateModel) {
        return state.paymentMethod;
    }

    @Selector()
    static paymentMethods(state: PaymentMethodStateModel) {
        return state.paymentMethod.data;
    }

    @Selector()
    static selectedPaymentMethod(state: PaymentMethodStateModel) {
        return state.selectedPaymentMethod;
    }

    @Action(GetPaymentMethods)
    getPaymentMethods(ctx: StateContext<PaymentMethodStateModel>, action: GetPaymentMethods) {
        return this.paymentMethodService.getPaymentMethods(action.payload).pipe(
            tap({
                next: result => {
                    ctx.patchState({
                        paymentMethod: {
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
}
