import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeOptionState } from '../../../../../shared/state/theme-option.state';
import { Option } from '../../../../interface/theme-option.interface';

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
    imports: [RouterLink,CommonModule]
})
export class LogoComponent {

  @Input() textClass: string = 'text-white f-w-600';
  @Input() data: Option | null;
  @Input() logo: string | null | undefined;

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

}
