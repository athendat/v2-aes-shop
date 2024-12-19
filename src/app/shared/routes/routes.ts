import { Routes } from "@angular/router";
import { authGuard } from "src/app/core/guard/auth.guard";

export const content: Routes = [
    {
        path: "",
        loadChildren: () => import("../../components/themes/themes.routes")
    },
    {
        path: "auth",
        loadChildren: () => import("../../components/auth/auth.routes")
    },
    {
        path: "account",
        loadChildren: () => import("../../components/account/account.routes"),
        canActivate : [authGuard]
    },
    {
        path: "",
        loadChildren: () => import("../../components/shop/shop.routes")
    },
    {
        path: "",
        loadChildren: () => import("../../components/blog/blog.routes")
    },
    {
        path: "",
        loadChildren: () => import("../../components/page/page.routes")
    },
    {
        path: '**',
        pathMatch: 'full',
        loadComponent: () => import("../../components/page/error404/error404.component").then(c => c.Error404Component),
    }
]
