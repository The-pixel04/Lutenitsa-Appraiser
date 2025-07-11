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
        component:Contact
    }
];
