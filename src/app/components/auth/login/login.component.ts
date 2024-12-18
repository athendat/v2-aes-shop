import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Store } from '@ngxs/store';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { AlertComponent } from '../../../shared/components/widgets/alert/alert.component';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

import { Login } from '../../../shared/action/auth.action';

import { AuthService } from '../../../shared/services/auth.service';

import { Breadcrumb } from '../../../shared/interface/breadcrumb';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [
        AlertComponent,
        BreadcrumbComponent,
        ButtonComponent,
        ReactiveFormsModule,
        RouterLink,
        TranslateModule,
    ],
})
export class LoginComponent {

    public form: FormGroup;
    public breadcrumb: Breadcrumb = {
        title: "sign_in",
        items: [{ label: 'sign_in', active: true }]
    }

    private authService = inject(AuthService);
    private formBuilder = inject(FormBuilder);
    private router = inject(Router);
    private store = inject(Store);

    constructor() {
        this.form = this.formBuilder.group({
            email: new FormControl('fr20587@gmail.com', [Validators.required, Validators.email]),
            password: new FormControl('P@ssw0rd', [Validators.required]),
        });
    }

    submit() {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            this.store.dispatch(new Login(this.form.value)).subscribe({
                complete: () => {
                    // Navigate to the intended URL after successful login
                    const redirectUrl = this.authService.redirectUrl || '/account/dashboard';
                    this.router.navigateByUrl(redirectUrl);

                    // Clear the stored redirect URL
                    this.authService.redirectUrl = undefined;
                }
            });
        }
    }

}
