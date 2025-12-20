import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AppNotification {
    id: string;
    title: string;
    description: string;
    time: string;
    dateGroup: 'Today' | 'Yesterday' | 'Older';
    type: 'success' | 'warning' | 'info' | 'error' | 'default';
    isRead: boolean;
    icon?: string;
}

import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/role.model';

@Component({
    selector: 'app-notifications',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './notifications.html',
})
export class NotificationsComponent {
    activeTab: 'All' | 'Unread' | 'Archived' = 'All';
    currentRole: UserRole = UserRole.Applicant;
    roles: UserRole[] = [UserRole.Applicant, UserRole.User, UserRole.Admin];

    // Mock Data Store
    mockData: { [key in UserRole]?: AppNotification[] } = {
        [UserRole.Applicant]: [
            {
                id: '1', title: 'Request Approved #NOC/Mar/2022/001', description: 'Your request for fiber optic maintenance has been approved successfully.', time: '12:53 PM', dateGroup: 'Today', type: 'success', isRead: false, icon: 'check_circle'
            },
            {
                id: '2', title: 'Action Required: Document Missing', description: 'The request #NOC/Mar/2022/025 is pending due to missing site survey documentation.', time: '10:30 AM', dateGroup: 'Today', type: 'warning', isRead: false, icon: 'warning'
            },
            {
                id: '3', title: 'System Maintenance Scheduled', description: 'The NOC portal will undergo scheduled maintenance on 16.07.2024 from 02:00 AM to 04:00 AM.', time: '09:00 AM', dateGroup: 'Today', type: 'info', isRead: false, icon: 'info'
            },
            {
                id: '4', title: 'Request Submitted #NOC/Mar/2022/012', description: 'Your request for fiber optic maintenance has been submitted successfully.', time: '15.07.2024 • 04:15 PM', dateGroup: 'Yesterday', type: 'default', isRead: true, icon: 'description'
            },
            {
                id: '5', title: 'Submission Failed #NOC/Mar/2022/010', description: 'There was a server error processing your request. Please try again.', time: '15.07.2024 • 01:20 PM', dateGroup: 'Yesterday', type: 'error', isRead: true, icon: 'error'
            }
        ],
        [UserRole.User]: [
            {
                id: '101', title: 'New Inspection Assigned', description: 'You have been assigned to inspect Site A for Request #NOC/New/101.', time: '11:00 AM', dateGroup: 'Today', type: 'info', isRead: false, icon: 'assignment_ind'
            },
            {
                id: '102', title: 'Inspection Overdue', description: 'Inspection for Request #NOC/Old/99 is overdue by 2 days.', time: '09:30 AM', dateGroup: 'Today', type: 'error', isRead: false, icon: 'event_busy'
            }
        ],
        [UserRole.Admin]: [
            {
                id: '201', title: 'New User Registration', description: 'A new inspector account requires approval.', time: '2:00 PM', dateGroup: 'Today', type: 'warning', isRead: false, icon: 'person_add'
            },
            {
                id: '202', title: 'High Load Warning', description: 'Server load is above 80%.', time: '1:00 PM', dateGroup: 'Today', type: 'error', isRead: false, icon: 'dns'
            }
        ]
    };

    notifications: AppNotification[] = [];

    get unreadCount(): number {
        return this.notifications.filter(n => !n.isRead).length;
    }

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.currentUserRole$.subscribe(role => {
            this.currentRole = role;
            this.loadNotifications();
        });
    }

    loadNotifications() {
        this.notifications = this.mockData[this.currentRole] || [];
    }

    switchRole(role: UserRole) {
        this.authService.setRole(role);
    }

    setTab(tab: 'All' | 'Unread' | 'Archived') {
        this.activeTab = tab;
    }

    get filteredNotifications() {
        let filtered = this.notifications;
        if (this.activeTab === 'Unread') {
            filtered = filtered.filter(n => !n.isRead);
        } else if (this.activeTab === 'Archived') {
            filtered = []; // Mock empty archive
        }
        return filtered;
    }

    get groupedNotifications() {
        const groups: { [key: string]: AppNotification[] } = {};
        this.filteredNotifications.forEach(n => {
            if (!groups[n.dateGroup]) groups[n.dateGroup] = [];
            groups[n.dateGroup].push(n);
        });
        // Return in specific order
        return ['Today', 'Yesterday', 'Older'].filter(g => groups[g]).map(g => ({ group: g, items: groups[g] }));
    }
}
