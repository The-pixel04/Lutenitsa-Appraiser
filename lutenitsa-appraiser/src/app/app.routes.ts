import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { AboutUs } from './components/about-us/about-us';
import { Contact } from './components/contact/contact';

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
        component: AboutUs
    },
    {
        path: 'contact',
        component: Contact
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login').then(c => c.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./components/register/register').then(c => c.Register)
    },
    {
        path: 'catalog',
        loadComponent: () => import('./components/catalog/catalog').then(c => c.Catalog)
    },
    {
        path: 'details/:id',
        loadComponent: () => import('./components/details/details').then(c => c.Details)
    },
    {
        path: 'add-appraise',
        loadComponent: () => import('./components/add-appraise/add-appraise').then(c => c.AddAppraise)
    }
];
