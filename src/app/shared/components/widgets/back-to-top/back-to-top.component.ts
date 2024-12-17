import { Component, HostListener, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ViewportScroller } from '@angular/common';

@Component({
    selector: 'app-back-to-top',
    templateUrl: './back-to-top.component.html',
    styleUrls: ['./back-to-top.component.scss'],
    standalone: true
})
export class BackToTopComponent {
  private platformId = inject<Object>(PLATFORM_ID);
  private viewScroller = inject(ViewportScroller);


  public show: boolean;

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) { // For SSR 
      let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (number > 600) { 
        this.show = true;
      } else {
        this.show = false;
      }
    }
  }

  tapToTop() {
  	this.viewScroller.scrollToPosition([0, 0]);
  }

}
