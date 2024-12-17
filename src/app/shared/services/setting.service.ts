import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Setting } from '../interface/setting.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private http = inject(HttpClient);


  getSettingOption(): Observable<Setting> {
    return this.http.get<Setting>(`${environment.URL}/setting.json`);
  }

  async getReCaptchaConfig(): Promise<void> {
    // const config = await this.getSettingOption().toPromise();
    // this.reCaptchaConfig = config?.values?.google_reCaptcha!;
  }

}
