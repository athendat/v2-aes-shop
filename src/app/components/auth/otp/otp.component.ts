import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { VerifyEmailOtp } from '../../../shared/action/auth.action';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';

@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtpComponent {

    public form: FormGroup;
    public email: string;
    public breadcrumb: Breadcrumb = {
        title: "Autenticación",
        items: [
            { label: 'Autenticación', active: false },
            { label: 'Confirmar Cuenta', active: true },
        ]
    }

    constructor(
        public router: Router,
        public store: Store,
        public formBuilder: FormBuilder
    ) {
        this.email = this.store.selectSnapshot(state => state.auth.email);
        this.form = this.formBuilder.group({
            otp: new FormControl('', [Validators.required, Validators.minLength(6)]),
        });
    }

    submit() {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            this.store.dispatch(new VerifyEmailOtp({
                email: this.email,
                token: this.form.value.otp
            })).subscribe(
                {
                    complete: () => {
                        this.router.navigateByUrl('/auth/update-password');
                    }
                }
            );
        }
    }

}

