import { Routes } from "@angular/router";
import { Error404Component } from './../../components/page/error404/error404.component';
import { NoAuthGuard } from "src/app/core/guard/noAuth.guard";
import { AuthGuard } from "src/app/core/guard/auth.guard";

export const content: Routes = [
    {
        path: "",
        canActivate: [NoAuthGuard],
        loadChildren: () => import("../../components/themes/themes.module").then((m) => m.ThemesModule)
    },
    {
        path: "auth",
        canActivate: [NoAuthGuard],
        loadChildren: () => import("../../components/auth/auth.module").then((m) => m.AuthModule)
    },
    {
        path: "account",
        canActivate: [AuthGuard],
        loadChildren: () => import("../../components/account/account.module").then((m) => m.AccountModule)
    },
    {
        path: "",
        loadChildren: () => import("../../components/shop/shop.module").then((m) => m.ShopModule)
    },
    {
        path: "",
        canActivate: [NoAuthGuard],
        loadChildren: () => import("../../components/blog/blog.module").then((m) => m.BlogModule)
    },
    {
        path: "",
        canActivate: [NoAuthGuard],
        loadChildren: () => import("../../components/page/page.module").then((m) => m.PagesModule)
    },
    {
        path: '**',
        pathMatch: 'full',
        component: Error404Component
    }
]
