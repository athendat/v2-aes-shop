import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MobileMenu } from '../../../../../shared/interface/menu.interface';

@Component({
    selector: 'app-mobile-menu',
    templateUrl: './mobile-menu.component.html',
    styleUrls: ['./mobile-menu.component.scss'],
    standalone: false
})
export class MobileMenuComponent {

  public menuItem: MobileMenu[] = [
    {
      id: 1,
      active: true,
      title: 'Inicio',
      icon: 'ri-home-2',
      path: '/'
    },
    {
      id: 2,
      active: false,
      title: 'Colecciones',
      icon: 'ri-apps-line js',
      path: '/collections'
    },
    {
      id: 3,
      active: false,
      title: 'Buscar',
      icon: 'ri-search-2',
      path: '/search'
    },
    {
      id: 4,
      active: false,
      title: 'Deseos',
      icon: 'ri-heart-3',
      path: '/wishlist'
    },
    {
      id: 5,
      active: false,
      title: 'Carrito',
      icon: 'fly-cate ri-shopping-bag',
      path: '/cart'
    }
  ]

  constructor(private router: Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menuItem?.forEach((menu: MobileMenu) => {
          menu.active = false;
          if((event.url.split("?")[0].toString()) === menu.path){
            menu.active = true;
          }
        })
      }
    })

  }

  activeMenu(menu: MobileMenu){
    this.menuItem.forEach(item => {
      this.menuItem.includes(menu)
      item.active  = false;
    })
    menu.active = !menu.active
  }
}
