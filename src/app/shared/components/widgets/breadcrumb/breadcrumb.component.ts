import { Component, input, Input } from '@angular/core';
import { Breadcrumb } from '../../../interface/breadcrumb';
import { TitleCasePipe } from '../../../pipe/title-case.pipe';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    imports: [RouterLink, TitleCasePipe, TranslateModule]
})
export class BreadcrumbComponent {

    breadcrumb = input<Breadcrumb | null>(null);

}
