import { Component, inject } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeOptionState } from '../../../state/theme-option.state';
import { TranslateModule } from '@ngx-translate/core';
import { UpdateSession } from '../../../action/theme-option.action';

@Component({
    selector: 'app-cookie',
    templateUrl: './cookie.component.html',
    styleUrls: ['./cookie.component.scss'],
    imports: [TranslateModule]
})
export class CookieComponent {
  private store = inject(Store);


  @Select(ThemeOptionState.cookies) cookies$: Observable<boolean>;

  public cookies: boolean = true;

  constructor(){
    this.cookies$.subscribe(res => this.cookies = res);
  }

  acceptCookies(value: boolean) {
    this.store.dispatch(new UpdateSession('cookies', value));
  }

}
