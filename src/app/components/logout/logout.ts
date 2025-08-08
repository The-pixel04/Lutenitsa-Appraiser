import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-logout',
    imports: [],
    templateUrl: './logout.html',
    styleUrl: './logout.css'
})
export class Logout {
    constructor(private authService: AuthService, private location: Location) {
        this.authService.logout().subscribe({
            next: () => {
                this.location.back()
            },
            error: (err) => {
                console.error('Logout failed', err);
            }
        })
    }
}
