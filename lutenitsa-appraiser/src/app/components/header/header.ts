
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

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
    menuOpen = false;

    toggleMenu(): void {
        this.menuOpen = !this.menuOpen;
        document.body.style.overflow = this.menuOpen ? 'hidden' : '';
    }

    closeMenu(): void {
        this.menuOpen = false;
        document.body.style.overflow = '';
    }
}
