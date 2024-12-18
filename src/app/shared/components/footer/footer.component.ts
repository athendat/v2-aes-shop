import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Option } from '../../interface/theme-option.interface';
import { ThemeOptionState } from '../../state/theme-option.state';
import { Footer } from '../../interface/theme.interface';
import { AsyncPipe } from '@angular/common';
import { BasicFooterComponent } from './basic-footer/basic-footer.component';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    imports: [BasicFooterComponent, AsyncPipe]
})

export class FooterComponent {

  @Input() footer: Footer;

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

}
