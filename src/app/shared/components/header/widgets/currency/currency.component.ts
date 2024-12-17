import { Component, Input, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, AsyncPipe } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Currency, CurrencyModel } from '../../../../../shared/interface/currency.interface';
import { CurrencyState } from '../../../../../shared/state/currency.state';
import { SettingState } from '../../../../../shared/state/setting.state';
import { Values } from '../../../../../shared/interface/setting.interface';
import { SelectedCurrency } from '../../../../../shared/action/setting.action';
import { ButtonComponent } from '../../../widgets/button/button.component';
import { ClickOutsideDirective } from '../../../../directive/out-side-directive';

@Component({
    selector: 'app-currency',
    templateUrl: './currency.component.html',
    styleUrls: ['./currency.component.scss'],
    standalone: true,
    imports: [ClickOutsideDirective, ButtonComponent, AsyncPipe]
})
export class CurrencyComponent {
  private store = inject(Store);
  private platformId = inject<Object>(PLATFORM_ID);


  @Select(SettingState.setting) setting$: Observable<Values>;
  @Select(SettingState.selectedCurrency) selectedCurrency$: Observable<Currency>;

  public open: boolean = false;
  public selectedCurrency: Currency;
  public setting: Values;

  @Input() style: string = 'basic';

  @Select(CurrencyState.currency) currency$: Observable<CurrencyModel>;

  constructor() {
    this.selectedCurrency$.subscribe(setting => this.selectedCurrency = setting);
  }

  openDropDown(){
    this.open = !this.open;
  }

  selectCurrency(currency: Currency){
    this.selectedCurrency = currency;
    this.open = false;
    this.store.dispatch(new SelectedCurrency(currency)).subscribe({
      complete: () => {
        if (isPlatformBrowser(this.platformId)) { // For SSR 
          window.location.reload();
        }
      }
    });
  }

  hideDropdown(){
    this.open = false;
  }
}
