import { Component, inject } from '@angular/core';
import { Location, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-error404',
    templateUrl: './error404.component.html',
    styleUrls: ['./error404.component.scss'],
    imports: [BreadcrumbComponent, ButtonComponent, AsyncPipe]
})
export class Error404Component {
  private location = inject(Location);


  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: "404",
    items: [{ label: "404", active: true }]
  }

  back(){
    this.location.back();
  }

}
