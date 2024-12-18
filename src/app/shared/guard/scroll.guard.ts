import { Injectable, inject } from '@angular/core';
import { Event, Scroll, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollPositionGuard   {
  private viewportScroller = inject(ViewportScroller);
  private router = inject(Router);


  canActivate(): boolean {
    this.router.events.pipe(filter((e: Event): e is Scroll => e instanceof Scroll))
      .subscribe((e) => {
        if (!this.router.url.includes('collections')) {
          this.viewportScroller.scrollToPosition([0, 0]);
        }else {
          this.viewportScroller.scrollToPosition([150, 150]);
        }
      });
    return true;
  }
}
