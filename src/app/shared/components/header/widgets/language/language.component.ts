import { Component, Input, PLATFORM_ID, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ButtonComponent } from '../../../widgets/button/button.component';
import { ClickOutsideDirective } from '../../../../directive/out-side-directive';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-language',
    templateUrl: './language.component.html',
    styleUrls: ['./language.component.scss'],
    imports: [ClickOutsideDirective, ButtonComponent]
})

export class LanguageComponent {
    private translate = inject(TranslateService);
    private platformId = inject<Object>(PLATFORM_ID);


    @Input() style: string = 'basic';

    public active: boolean = false;
    public languages: any[] = [
        {
            language: 'English',
            code: 'en',
            icon: 'us'
        },
        {
            language: 'Español',
            code: 'es',
            icon: 'es'
        },
    ]

    public selectedLanguage: any = {
        language: 'Español',
        code: 'es',
        icon: 'es'
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            let language = localStorage.getItem("language");

            if (language === null) {
                localStorage.setItem("language", JSON.stringify(this.selectedLanguage));
                this.translate.use(this.selectedLanguage.code);
            } else {
                this.selectedLanguage = JSON.parse(language);
                this.translate.use(this.selectedLanguage.code);
            }
        }
    }

    selectLanguage(language: any) {
        this.active = false;
        this.translate.use(language.code);
        this.selectedLanguage = language;
        localStorage.setItem("language", JSON.stringify(this.selectedLanguage));
    }

    openDropDown() {
        this.active = !this.active;
    }


    hideDropdown() {
        this.active = false;
    }

}
