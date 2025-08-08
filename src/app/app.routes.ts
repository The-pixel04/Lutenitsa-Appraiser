import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { AboutUs } from './components/about-us/about-us';
import { Contact } from './components/contact/contact';
import { authGuard } from './core/guards/auth.guard';
import { notAuthGuard } from './core/guards/not-auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home,
        data: { animation: 'homePage' }
    },
    {
        path: 'aboutUs',
        loadComponent: () => import('./components/about-us/about-us').then(c => c.AboutUs),
    },
    {
        path: 'contact',
        loadComponent: () => import('./components/contact/contact').then(c => c.Contact),
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login').then(c => c.Login),
        canActivate: [notAuthGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./components/register/register').then(c => c.Register),
        canActivate: [notAuthGuard]
    },
    {
        path: 'catalog/:page',
        loadComponent: () => import('./components/catalog/catalog').then(c => c.Catalog),
    },
    {
        path: 'details/:id',
        loadComponent: () => import('./components/details/details').then(c => c.Details)
    },
    {
        path: 'add-appraise',
        loadComponent: () => import('./components/add-appraise/add-appraise').then(c => c.AddAppraise),
        canActivate: [authGuard]
    },
    {
        path: 'edit-appraise/:id',
        loadComponent: () => import('./components/edit-appraise/edit-appraise').then(c => c.EditAppraise),
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./components/profile/profile').then(c => c.Profile),
        canActivate: [authGuard]
    },
    {
        path: 'logout',
        loadComponent: () => import('../app/components/logout/logout').then(c => c.Logout)
    }
];
