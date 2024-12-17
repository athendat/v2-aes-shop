import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-language',
    templateUrl: './language.component.html',
    styleUrls: ['./language.component.scss'],
    standalone: false
})
export class LanguageComponent {

    @Input() style: string = 'basic';

    public active: boolean = false;
    public languages: any[] = [
        {
            language: 'English',
            code: 'en',
            icon: 'us'
        },
        {
            language: 'Français',
            code: 'fr',
            icon: 'fr'
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

    constructor(private translate: TranslateService) {
        let language = localStorage.getItem("language");

        if (language == null) {
            this.translate.use(this.selectedLanguage.code);
        } else {
            this.selectedLanguage = JSON.parse(language);
            this.translate.use(this.selectedLanguage.code);
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
