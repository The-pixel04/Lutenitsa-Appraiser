import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule
    ],
    templateUrl: './header.html',
    styleUrl: './header.css'
})
export class Header {
    protected authService = inject(AuthService);
    private location = inject(Location);

    readonly isAuthenticated = this.authService.isAuthenticated;
    readonly currentUser = this.authService.currentUser;

    menuOpen = false;

    logOut(): void {
        this.authService.logout().subscribe({
            next: () => {
                this.location.back();
            },
            error: (err) => {
                console.error('Logout failed', err);
            }
        })
    }

    toggleMenu(): void {
        this.menuOpen = !this.menuOpen;
        document.body.style.overflow = this.menuOpen ? 'hidden' : '';
    }

    closeMenu(): void {
        this.menuOpen = false;
        document.body.style.overflow = '';
    }
}
