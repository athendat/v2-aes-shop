import { Component, PLATFORM_ID, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngxs/store';
import { TranslateModule } from '@ngx-translate/core';
import { Select2Module } from 'ng-select2-component';

import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

import { CustomValidators } from '../../../shared/validator/password-match';

import { Register } from '../../../shared/action/auth.action';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';

import * as data from '../../../shared/data/country-code';



@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    imports: [BreadcrumbComponent, ReactiveFormsModule, Select2Module, ButtonComponent, RouterLink, TranslateModule]
})
export class RegisterComponent {

    public form: FormGroup;
    public breadcrumb: Breadcrumb = {
        title: "sign_up",
        items: [{ label: 'sign_up', active: true }]
    }
    public codes = data.countryCodes;
    public tnc = new FormControl(true, [Validators.requiredTrue]);
    public isBrowser: boolean;

    private store = inject(Store);
    private router = inject(Router);
    private platformId = inject<Object>(PLATFORM_ID);

    constructor() {
        this.isBrowser = isPlatformBrowser(this.platformId);

        this.form = new FormGroup(
            {
                name: new FormControl('', [Validators.required]),
                email: new FormControl('', [Validators.required, Validators.email]),
                phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
                country_code: new FormControl('53', [Validators.required]),
                password: new FormControl('', [Validators.required]),
                password_confirmation: new FormControl('', [Validators.required]),
            },
            {
                validators: CustomValidators.MatchValidator('password', 'password_confirmation')
            }
        );
    }

    get passwordMatchError() {
        return (
            this.form.getError('mismatch') &&
            this.form.get('password_confirmation')?.touched
        );
    }

    submit() {
        this.form.markAllAsTouched();

        if (this.tnc.invalid) {
            return;
        } else
            this.store.dispatch(new Register(this.form.value)).subscribe({
                complete: () => {
                    this.router.navigateByUrl('/auth/otp');
                }
            }
            );
    }
}

