import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { SIDEBAR_CONFIG } from '../../core/config/sidebar.config';
import { UserRole } from '../../core/models/role.model';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule, MatIconModule],
    templateUrl: './sidebar.html',
    styleUrls: ['./sidebar.css'],
})
export class SidebarComponent {
    isCollapsed = false;

    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
    }

    constructor(private router: Router, private authService: AuthService) {
        this.authService.currentUserRole$.subscribe(role => {
            if (role && SIDEBAR_CONFIG[role]) {
                this.menuItems = SIDEBAR_CONFIG[role];
            } else {
                this.menuItems = SIDEBAR_CONFIG[UserRole.Applicant]; // Fallback
            }
        });
    }

    menuItems: any[] = [];

    logout() {
        // Clear auth data if any in local storage
        // localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}
