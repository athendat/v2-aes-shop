import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CompareModel } from '../interface/compare.interface';

@Injectable({
  providedIn: 'root'
})
export class CompareService {
  private http = inject(HttpClient);


  public skeletonLoader: boolean = false;

  getCompareItems(): Observable<CompareModel> {
    // return this.http.get<CompareModel>(`/compare.json`);
    return of({
        data: [],
        total: 0
    })
  }

}
