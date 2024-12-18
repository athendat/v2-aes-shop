import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ThemeOption } from '../interface/theme-option.interface';
import { RestResponse } from '../types/common.types';

@Injectable({
  providedIn: 'root'
})
export class ThemeOptionService {
  private http = inject(HttpClient);
  public preloader: boolean = true;
  public theme_color: string;

  getThemeOption(): Observable<ThemeOption> {
    return this.http.get<RestResponse<ThemeOption>>(`/theme-options`).pipe(
        filter((response) => {

            //  Comprobar que la respuesta tiene valores
            return response.data !== undefined;
        }),
        map((response) => response.data!)
    );
  }

}
