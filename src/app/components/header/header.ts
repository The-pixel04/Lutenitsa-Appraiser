import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
    private router = inject(Router);

    readonly isAuthenticated = this.authService.isAuthenticated;
    readonly currentUser = this.authService.currentUser;

    menuOpen = false;

    logOut(): void {
        this.authService.logout().subscribe({
            next: () => {
                this.router.navigate(['/']);
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
