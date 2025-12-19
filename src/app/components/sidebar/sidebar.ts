import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

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

    menuItems = [
        { title: 'Dashboard', icon: 'dashboard', route: '/applicant/dashboard' },
        { title: 'My Request', icon: 'folder_shared', route: '/applicant/my-request' },
        { title: 'New Request', icon: 'add_circle', route: '/applicant/new-request' },
        { title: 'Notification', icon: 'notifications', route: '/applicant/notification' },
        { title: 'Support', icon: 'help', route: '/applicant/support' },
        { title: 'Setting', icon: 'settings', route: '/applicant/setting' },
    ];
}
