import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Review, ReviewModel } from '../interface/review.interface';
import { environment } from '../../../environments/environment';
import { RestResponse } from '../types/common.types';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    
    #http = inject(HttpClient);


    getReview(slug: Params): Observable<ReviewModel> {
        return this.#http.get<ReviewModel>(`/reviews/product`, { params: slug });
    }

    createReview(review: Params): Observable<RestResponse<Review>> {
        return this.#http.post<RestResponse<Review>>(`/reviews`, review);
    }

    updateReview(review: Params): Observable<RestResponse<Review>> {
        return this.#http.patch<RestResponse<Review>>(`/reviews`, review);
    }

}
