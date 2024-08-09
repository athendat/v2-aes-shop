import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { AccountUser } from "../../../shared/interface/account.interface";
import { AccountState } from '../../../shared/state/account.state';
import { CartState } from '../../../shared/state/cart.state';
import { GetCartItems } from '../../../shared/action/cart.action';
import { OrderState } from '../../../shared/state/order.state';
import { Checkout, PlaceOrder, Clear } from '../../../shared/action/order.action';
import { AddressModalComponent } from '../../../shared/components/widgets/modal/address-modal/address-modal.component';
import { Cart } from '../../../shared/interface/cart.interface';
import { SettingState } from '../../../shared/state/setting.state';
import { GetSettingOption } from '../../../shared/action/setting.action';
import { OrderCheckout } from '../../../shared/interface/order.interface';
import { Values, DeliveryBlock } from '../../../shared/interface/setting.interface';
import { AuthStore } from 'src/app/shared/store/auth.store';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit, OnDestroy {

    public breadcrumb: Breadcrumb = {
        title: "Confirmar pedido",
        items: [{ label: 'Confirmar pedido', active: true }]
    }

    private store = inject(Store);

    user$: Observable<AccountUser | null> = this.store.select(AccountState.user);
    cartItem$: Observable<Cart[]> = this.store.select(CartState.cartItems);
    checkout$: Observable<OrderCheckout | null> = this.store.select(OrderState.checkout);
    setting$: Observable<Values | null> = this.store.select(SettingState.setting);
    authStore = inject(AuthStore);

    @ViewChild("addressModal") AddressModal: AddressModalComponent;
    @ViewChild('cpn', { static: false }) cpnRef: ElementRef<HTMLInputElement>;

    public form: FormGroup;
    public coupon: boolean = true;
    public couponCode: string;
    public appliedCoupon: boolean = false;
    public couponError: string | null;
    public checkoutTotal: OrderCheckout;
    public loading: boolean = false;

    private formBuilder = inject(FormBuilder);

    constructor(
    ) {
        this.store.dispatch(new GetCartItems());
        this.store.dispatch(new GetSettingOption());

        this.form = this.formBuilder.group({
            products: this.formBuilder.array([], [Validators.required]),
            shipping_address_id: new FormControl('', [Validators.required]),
            billing_address_id: new FormControl('', [Validators.required]),
            points_amount: new FormControl(null),
            wallet_balance: new FormControl(null),
            coupon: new FormControl(),
            delivery_description: new FormControl('', [Validators.required]),
            delivery_interval: new FormControl(),
            payment_method: new FormControl('', [Validators.required])
        });
    }

    get productControl(): FormArray {
        return this.form.get("products") as FormArray;
    }

    ngOnInit() {
        this.checkout$.subscribe(data => this.checkoutTotal = data!);

        this.cartItem$.subscribe(items => {
            if (!items?.length) {
                return;
            }
            this.productControl.clear();
            items!.forEach((item: Cart) =>
                this.productControl.push(
                    this.formBuilder.group({
                        product_id: new FormControl(item?.product_id, [Validators.required]),
                        variation_id: new FormControl(item?.variation_id ? item?.variation_id : null),
                        quantity: new FormControl(item?.quantity),
                        price: new FormControl(item?.product.sale_price),
                    })
                ));
        });
    }

    selectShippingAddress(id: string) {
        if (id) {
            this.form.controls['shipping_address_id'].setValue(id);
            this.checkout();
        }
    }

    selectBillingAddress(id: string) {
        if (id) {
            this.form.controls['billing_address_id'].setValue(id);
            this.checkout();
        }
    }

    selectDelivery(value: DeliveryBlock) {
        this.form.controls['delivery_description'].setValue(value?.delivery_description);
        this.form.controls['delivery_interval'].setValue(value?.delivery_interval);
        this.checkout();
    }

    selectPaymentMethod(value: string) {
        this.form.controls['payment_method'].setValue(value);
        this.checkout();
    }

    togglePoint(event: Event) {
        this.form.controls['points_amount'].setValue((<HTMLInputElement>event.target)?.checked);
        this.checkout();
    }

    toggleWallet(event: Event) {
        this.form.controls['wallet_balance'].setValue((<HTMLInputElement>event.target)?.checked);
        this.checkout();
    }

    showCoupon() {
        this.coupon = true;
    }

    setCoupon(value?: string) {
        this.couponError = null;

        if (value)
            this.form.controls['coupon'].setValue(value);
        else
            this.form.controls['coupon'].reset();

        this.store.dispatch(new Checkout(this.form.value)).subscribe({
            error: (err) => {
                this.couponError = err.message;
            },
            complete: () => {
                this.appliedCoupon = value ? true : false;
                this.couponError = null;
            }
        });
    }

    couponRemove() {
        this.setCoupon();
    }

    checkout() {

        // If has coupon error while checkout
        if (this.couponError) {
            this.couponError = null;
            this.cpnRef.nativeElement.value = '';
            this.form.controls['coupon'].reset();
        }

        if (this.form.valid) {
            this.loading = true;
            this.store.dispatch(new Checkout(this.form.value)).subscribe({
                error: (err) => {
                    this.loading = false;
                    throw new Error(err);
                },
                complete: () => {
                    this.loading = false;
                }
            });
        }
    }

    placeorder() {
        if (this.form.valid) {
            if (this.cpnRef && !this.cpnRef.nativeElement.value) {
                this.form.controls['coupon'].reset();
            }
            this.store.dispatch(new PlaceOrder(this.form.value));
        }
    }

    ngOnDestroy() {
        this.store.dispatch(new Clear());
        this.form.reset();
    }

}
