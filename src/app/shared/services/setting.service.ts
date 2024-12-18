import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Setting } from '../interface/setting.interface';
import { RestResponse } from '../types/common.types';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private http = inject(HttpClient);


  getSettingOption(): Observable<Setting> {
    return this.http.get<RestResponse<Setting>>(`/settings`).pipe(
        filter((response) => {

            //  Comprobar que la respuesta tiene valores
            return response.data !== undefined;
        }),
        map((response) => response.data!)
    );
  }

  async getReCaptchaConfig(): Promise<void> {
    // const config = await this.getSettingOption().toPromise();
    // this.reCaptchaConfig = config?.values?.google_reCaptcha!;
  }

}
