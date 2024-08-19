// Angular Module
import { Component, inject } from '@angular/core';

// Third-party
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Store } from '@ngxs/store';

// Store
import { ThemeOptionState } from 'src/app/shared/state/theme-option.state';

// Types
import { AboutUs } from 'src/app/shared/interface/theme-option.interface';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';


@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
})
export class AboutUsComponent {

    #store = inject(Store);

    themeOption$ = this.#store.select(ThemeOptionState.themeOptions);
    aboutData: AboutUs;
    breadcrumb: Breadcrumb = {
        title: "Sobre Nosotros",
        items: [{ label: 'Sobre Nosotros', active: true }]
    }
    clientsOptions: OwlOptions = {
        loop: true,
        margin: 20,
        items: 3,
        autoplay: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            740: {
                items: 3
            },
            940: {
                items: 4
            }
        },
    }
    teamOptions: OwlOptions = {
        loop: true,
        margin: 20,
        items: 4,
        autoplay: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            740: {
                items: 3
            },
            940: {
                items: 4
            }
        },
    }
    testimonialsOptions: OwlOptions = {
        loop: true,
        margin: 20,
        items: 4,
        // autoplay:true,
        center: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            740: {
                items: 3
            },
            940: {
                items: 4
            }
        },
    }

    /**
     * Constructor
     */
    constructor() {
        this.themeOption$.subscribe(data => this.aboutData = data!.about_us);
    }
}
