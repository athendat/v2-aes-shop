import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Setting } from '../interface/setting.interface';
import { RestResponse } from '../types';

@Injectable({
    providedIn: 'root'
})
export class SettingService {

    #http = inject(HttpClient);

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getSettingOption(): Observable<Setting> {
        // return this.http.get<Setting>(`${environment.URL}/setting.json`);

        return this.#http.get<RestResponse<Setting>>(`${environment.API_URL}/settings`,)
            .pipe(
                map((response) => {
                    return response.data!
                })
            );
    }

}
