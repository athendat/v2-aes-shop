import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ThemeOption } from '../interface/theme-option.interface';
import { RestResponse } from '../types';

@Injectable({
    providedIn: 'root'
})
export class ThemeOptionService {

    public preloader: boolean = true;
    public theme_color: string;


    // Private properties
    // #store = inject(ThemesStore);
    #http = inject(HttpClient);

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    getThemeOption(): Observable<ThemeOption> {
        return this.#http.get<RestResponse<ThemeOption>>(`${environment.API_URL}/themes/options`).pipe(
            map(response => {
                return response.data!;
                // this.#store.setThemeOption(response.data);
            }));

        // return this.#http.get<ThemeOption>(`${environment.URL}/theme-option.json`);
    }


    /**
     * Obtener opciones del tema
     */
    // findThemeOptions(): void {


    findThemeOptions(): Observable<RestResponse<ThemeOption>> {
        console.log('ops');
        return this.#http.get<RestResponse<ThemeOption>>(`${environment.API_URL}/themes/options`).pipe(
            tap(response => {
                console.log(response);
                // this.#store.setThemeOption(response.data);
            })
        );
    }
}
