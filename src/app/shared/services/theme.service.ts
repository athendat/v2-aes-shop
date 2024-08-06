import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RestResponse } from '../types';
import { Paris } from '../interface/theme.interface';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {


    #http = inject(HttpClient);

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    getHomePage(slug?: string): Observable<any> {
        if (!slug) {
            slug = 'paris';
        }
        // return this.http.get(`${environment.URL}/themes/${slug}.json`);

        return this.#http.get<RestResponse<Paris>>(`${environment.API_URL}/themes/slug/${slug}`).pipe(
            map(response => {
                return response.data!;
            })
        );
    }

}
