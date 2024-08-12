import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Review, ReviewModel } from '../interface/review.interface';
import { environment } from 'src/environments/environment';
import { RestResponse } from '../types';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {

    #http = inject(HttpClient);

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    getReview(slug: Params): Observable<ReviewModel> {
        return this.#http.get<ReviewModel>(`${environment.URL}/review.json`, { params: slug });
    }

    createReview(review: Params): Observable<RestResponse<Review>> {
        return this.#http.post<RestResponse<Review>>(`${environment.API_URL}/reviews`, review);
    }

    updateReview(review: Params): Observable<RestResponse<Review>> {
        return this.#http.patch<RestResponse<Review>>(`${environment.API_URL}/reviews`, review);
    }

}
