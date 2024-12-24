import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./account.component').then(c => c.AccountComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
            },
            {
                path: 'wallet',
                loadComponent: () => import('./wallet/wallet.component').then(c => c.WalletComponent),
            },
            {
                path: 'notifications',
                loadComponent: () => import('./notification/notification.component').then(c => c.NotificationComponent),
            },
            {
                path: 'bank-details',
                loadComponent: () => import('./bank-details/bank-details.component').then(c => c.BankDetailsComponent),
            },
            {
                path: 'point',
                loadComponent: () => import('./point/point.component').then(c => c.PointComponent),
            },
            {
                path: 'order',
                loadComponent: () => import('./orders/orders.component').then(c => c.OrdersComponent),
            },
            {
                path: 'order/details/:id',
                loadComponent: () => import('./orders/details/details.component').then(c => c.OrderDetailsComponent),
            },
            {
                path: 'refund',
                loadComponent: () => import('./refund/refund.component').then(c => c.RefundComponent),
            },
            {
                path: 'addresses',
                loadComponent: () => import('./addresses/addresses.component').then(c => c.AddressesComponent)
            }
        ]
    }
] as Routes;

