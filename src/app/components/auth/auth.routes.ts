import { Routes } from "@angular/router";

export default [
    {
        path: "login",
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
    },
    {
        path: "forgot-password",
        loadComponent: () => import('./forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent),
    },
    {
        path: "otp",
        loadComponent: () => import('./otp/otp.component').then(c => c.OtpComponent),
    },
    {
        path: "update-password",
        loadComponent: () => import('./update-password/update-password.component').then(c => c.UpdatePasswordComponent),
    },
    {
        path: "register",
        loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent),
    }
] as Routes;
