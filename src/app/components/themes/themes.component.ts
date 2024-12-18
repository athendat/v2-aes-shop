import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, Select  } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeState } from '../../shared/state/theme.state';
import { GetHomePage } from '../../shared/action/theme.action';
import { ThemeOptionService } from '../../shared/services/theme-option.service';
import { DenverComponent } from './denver/denver.component';
import { BerlinComponent } from './berlin/berlin.component';
import { MadridComponent } from './madrid/madrid.component';
import { RomeComponent } from './rome/rome.component';
import { OsakaComponent } from './osaka/osaka.component';
import { TokyoComponent } from './tokyo/tokyo.component';
import { ParisComponent } from './paris/paris.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-themes',
    templateUrl: './themes.component.html',
    styleUrls: ['./themes.component.scss'],
    imports: [ParisComponent, TokyoComponent, OsakaComponent,
      RomeComponent, MadridComponent, BerlinComponent, DenverComponent, AsyncPipe]
})
export class ThemesComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private themeOptionService = inject(ThemeOptionService);


  @Select(ThemeState.homePage) homePage$: Observable<any>;

  public slug: string;

  constructor() {
    this.route.params.subscribe(params => {
      this.themeOptionService.preloader = true;
      this.slug = params['slug'] ? params['slug'] : 'paris';
      this.store.dispatch(new GetHomePage(params['slug'] ? params['slug'] : 'paris'));
    });
  }

}
