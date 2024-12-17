import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeState } from '../../shared/state/theme.state';
import { GetHomePage } from '../../shared/action/theme.action';
import { ThemeOptionService } from '../../shared/services/theme-option.service';

@Component({
    selector: 'app-themes',
    templateUrl: './themes.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ThemesComponent {

    // Private properties
    #store = inject(Store);
    #themeOptionService = inject(ThemeOptionService);

    // Public properties
    homePage$: Observable<any> = this.#store.select(ThemeState.homePage);
    slug = input<string>('paris');

    constructor(
    ) {
        effect(() => {

            // Preloader
            this.#themeOptionService.preloader = true;

            // Get Home Page
            this.#store.dispatch(new GetHomePage(this.slug()));

        })
    }

}
