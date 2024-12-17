import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private http = inject(HttpClient);


  getHomePage(slug?: string): Observable<any> {
    if(!slug) {
      slug = 'paris';
    }
    return this.http.get(`${environment.URL}/themes/${slug}.json`);
  }

}
