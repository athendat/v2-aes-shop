import { Routes } from '@angular/router';
import { content } from './shared/routes/routes';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: "maintenance",
        loadComponent: () => import("./maintenance/maintenance.component").then(c => c.MaintenanceComponent),
      },
      {
        path: "",
        loadComponent: () => import("./layout/layout.component").then(c => c.LayoutComponent),
        children: content,
      }
];
