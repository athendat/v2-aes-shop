import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, ViewChild, effect, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, mergeMap, takeUntil } from 'rxjs/operators';
import { ViewOrder } from '../../../../shared/action/order.action';
import { GetOrderStatus } from '../../../../shared/action/order-status.action';
import { OrderState } from '../../../../shared/state/order.state';
import { OrderStatusState } from '../../../../shared/state/order-status.state';
import { Order } from '../../../../shared/interface/order.interface';
import { OrderStatusModel } from '../../../../shared/interface/order-status.interface';
import { RefundModalComponent } from '../../../../shared/components/widgets/modal/refund-modal/refund-modal.component';
import { PayModalComponent } from '../../../../shared/components/widgets/modal/pay-modal/pay-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-order-details',
    templateUrl: './details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class OrderDetailsComponent implements OnInit {

    @ViewChild("refundModal") RefundModal: RefundModalComponent;
    @ViewChild("payModal") PayModal: PayModalComponent;

    // Public properties
    id = input.required<string>();
    order: Order;

    // Private properties
    #store = inject(Store);
    #destroyRef = inject(DestroyRef);
    #changeDetectorRef = inject(ChangeDetectorRef);

    orderStatus$: Observable<OrderStatusModel> = this.#store.select(OrderStatusState.orderStatus);


    constructor() {
        this.#store.dispatch(new GetOrderStatus());

        effect(() => {
            console.log(this.id());
            this.#store.dispatch(new ViewOrder(+this.id()));
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // ------------------------------------------------------------------------------------------------

    /**
     * On Init
     */
    ngOnInit(): void {

        // Obtener el pedido
        this.#store.select(OrderState.selectedOrder)
            .pipe(takeUntilDestroyed(this.#destroyRef)
            ).subscribe(order => {

                console.log({ order });
                this.order = order!;

                // Marcar para comprobar
                this.#changeDetectorRef.markForCheck();
            })

    }

}
