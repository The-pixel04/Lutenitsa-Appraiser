import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { AboutUs } from './components/about-us/about-us';
import { Contact } from './components/contact/contact';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

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
    },
    {
        path:'login',
        component:Login
    },
    {
        path:'register',
        component:Register
    }
];
