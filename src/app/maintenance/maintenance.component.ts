import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SettingState } from '../shared/state/setting.state';
import { Observable } from 'rxjs';
import { Values } from '../shared/interface/setting.interface';
import { GetSettingOption } from '../shared/action/setting.action';
import { NgStyle, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.scss'],
    imports: [NgStyle, AsyncPipe]
})
export class MaintenanceComponent {
  private store = inject(Store);


  @Select(SettingState.setting) setting$: Observable<Values>;

  constructor(){
    this.store.dispatch(new GetSettingOption());
  }

}
